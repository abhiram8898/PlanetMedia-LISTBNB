import { useQuery } from "@tanstack/react-query";
import { getAllAdvertisementsDetails } from "../../../../Api/Website";
import { Link, useNavigate } from "react-router-dom";
import viewIcon from "../../../../assets/vector/Link.png";
import Spinner from "../../../../Components/loadingSpinner/spinner";
import { useState } from "react";

interface Advertisement {
  id: string;
  image: string;
  description: string;
  price: number;
  title: string;
  owner: {
    id: string;
  };
}

const AdvertisementGrid = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: advertisements, isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: getAllAdvertisementsDetails,
  });

  const handleEditAdvertisement = (id: string) => {
    navigate(`/edit-ad/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-start h-screen" role="status">
        <Spinner />
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = advertisements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(advertisements.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section aria-label="Advertisement listings">
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-[#F50964]">What's new</p>
        <h2 className="text-[#212121] font-semibold text-2xl md:text-4xl">
          Fresh Recommendations
        </h2>
      </div>

      <p aria-live="polite">
        <span className="text-[#F50964]">{advertisements?.length}</span> items
        available
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center items-center"
        role="list"
      >
        {currentItems.map((advertisement: Advertisement) => (
          <article
            className="col-span-1 border border-[#E0E0E0] rounded-xl hover:border-[#F50964] transition-all duration-300"
            key={advertisement?.id}
            role="listitem"
          >
            <div className="relative">
              <img
                src={
                  advertisement?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4QaRqKWxfrGdQ9r5U5mWg-RWItNxzmphX-Q&s"
                }
                alt={`${advertisement?.title || "Advertisement"} preview image`}
                className="rounded-xl w-full h-[217px] object-cover"
              />
              {localStorage.getItem("token") &&
                advertisement?.owner?.id == localStorage.getItem("user") && (
                  <button
                    className="absolute cursor-pointer top-3 right-3 bg-[#F50964] text-white px-4 py-2 rounded-full z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAdvertisement(advertisement?.id);
                    }}
                    aria-label={`Edit advertisement: ${advertisement?.title}`}
                  >
                    Edit Ad
                  </button>
                )}
            </div>

            <div className="block p-4">
              <div className="flex justify-between items-center">
                <p>Paris</p>
                <p>1 day ago</p>
              </div>

              <h3>{advertisement?.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-[#F50964] font-semibold text-2xl">
                  ${advertisement?.price}
                </p>
                <Link
                  to={`/product-details/${advertisement?.id}`}
                  aria-label={`View details for ${advertisement?.title}`}
                >
                  <img src={viewIcon} alt="View details" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <nav
        aria-label="Pagination"
        className="flex flex-wrap justify-center mt-8 gap-2"
      >
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full transition-colors duration-200 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-[#F50964] hover:text-white"
          }`}
          aria-label="Go to first page"
        >
          First
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          // Only show current page and adjacent pages on mobile
          if (
            window.innerWidth < 640 &&
            Math.abs(currentPage - (i + 1)) > 1 &&
            i + 1 !== 1 &&
            i + 1 !== totalPages
          ) {
            return null;
          }
          return (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full transition-colors duration-200 ${
                currentPage === i + 1
                  ? "bg-[#F50964] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-[#F50964] hover:text-white"
              }`}
              aria-label={`Go to page ${i + 1}`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full transition-colors duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-[#F50964] hover:text-white"
          }`}
          aria-label="Go to last page"
        >
          Last
        </button>
      </nav>
    </section>
  );
};

export default AdvertisementGrid;
