import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { adDeleteSubmitHandler } from "./submitHandler/submithandler";
import { getAllAdvertisementsDetails } from "../../../Api/Website";
import Spinner from "../../../Components/loadingSpinner/spinner";

type TabType = "profileUpdate" | "profile" | "postAd" | "ads" | "Logout";

interface TabProps {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  tab: TabType;
}

interface Product {
  id: string;
  owner: {
    id: string;
  };
  image: string;
  title: string;
  price: number;
  createdAt: string;
}

const AdsListing: React.FC<TabProps> = ({ setTab, setEdit, setId, tab }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage?.getItem("user") || "{}");

  const {
    data: productsListing,
    refetch: refetchProducts,
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["allAdvertisements"],
    queryFn: getAllAdvertisementsDetails,
    enabled: Boolean(user),
  });

  const filteredProductListing = productsListing?.filter(
    (product) => product.owner.id === user
  );

  const handleDeleteAd = async (id: string) => {
    await adDeleteSubmitHandler(id, refetchProducts);
  };

  const handleEditAd = (id: string) => {
    setTab("postAd");
    setEdit(true);
    setId(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-start h-screen" role="status">
        <Spinner />
      </div>
    );
  }

  if (!filteredProductListing?.length) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <p className="text-gray-500">No advertisements found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredProductListing.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
            <img
              src={product.image}
              alt={product.title}
              className="w-full md:w-40 h-40 object-cover rounded-lg"
            />
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-gray-800">
                {product.title}
              </h3>
              <p className="font-normal text-sm text-[#333333]">
                Dexas, Texas •{" "}
                <time className="text-[#524EB7]" dateTime={product.createdAt}>
                  24 hours ago
                </time>
              </p>
              <p className="text-xl font-semibold">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 text-[#667085] w-full md:w-auto">
            <button
              onClick={() => navigate(`/product-details/${product.id}`)}
              className="w-full md:w-auto text-xs md:text-base cursor-pointer px-2 md:px-6 py-2.5 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-colors"
              aria-label={`View details for ${product.title}`}
            >
              View
            </button>
            <button
              onClick={() => handleEditAd(product.id)}
              className="w-full md:w-auto text-xs md:text-base cursor-pointer px-2 md:px-6 py-2.5 rounded-full bg-[#F50964] text-white font-medium hover:bg-[#d9085a] transition-colors"
              aria-label={`Edit ${product.title}`}
            >
              Edit Ad
            </button>
            {tab === "ads" && (
              <button
                onClick={() => handleDeleteAd(product.id)}
                className="w-full md:w-auto text-xs md:text-base cursor-pointer px-2 md:px-6 py-2.5 rounded-full bg-[#F50964] text-white font-medium hover:bg-[#d9085a] transition-colors"
                aria-label={`Delete ${product.title}`}
              >
                Delete Ad
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdsListing;
