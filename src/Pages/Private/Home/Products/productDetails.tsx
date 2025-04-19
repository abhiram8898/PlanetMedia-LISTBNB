import { useQuery } from "@tanstack/react-query";
import { getSingleAdvertisementsDetails } from "../../../../Api/Website";
import { useParams } from "react-router-dom";
import tag from "../../../../assets/vector/Component 9.png";
import calender from "../../../../assets/vector/Component 1.png";
import map from "../../../../assets/vector/Vector2.png";
import { useState } from "react";
import phone from "../../../../assets/vector/phonecolor.png";
import email from "../../../../assets/vector/mailcolor.png";
import Spinner from "../../../../Components/loadingSpinner/spinner";

interface Owner {
  id: string;
  firstName: string;
  lastName: string;
}

interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
}

interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  owner: Owner;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const { data: productDetailData, isLoading } = useQuery<ProductData>({
    queryKey: ["productDetail", id],
    queryFn: () => getSingleAdvertisementsDetails(id),
    enabled: !!id,
  });

  const customerData: CustomerData = {
    id: "cust_123",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@bnb.com",
    phone: "+1 (555) 123-4567",
    username: "john X123",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-start h-screen" role="status">
        <Spinner />
      </div>
    );
  }

  if (!productDetailData) {
    return (
      <div className="flex justify-center items-start h-screen">
        <p>No product data found</p>
      </div>
    );
  }

  const ownerName = productDetailData.owner?.firstName
    ? `${productDetailData.owner.firstName} ${productDetailData.owner.lastName}`
    : `${customerData.firstName} ${customerData.lastName}`;

  const maskedPhone = showPhone
    ? customerData.phone
    : `${customerData.phone.slice(0, 2)}${"*".repeat(5)}`;

  const maskedEmail = showEmail
    ? customerData.email
    : `${customerData.email.slice(0, 4)}${"*".repeat(5)}`;

  return (
    <div className="mx-auto my-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
        <div className="col-span-1 md:col-span-6 space-y-6">
          <div className="bg-white border border-[#E1E1E1] rounded-lg p-6 space-y-6">
            <div className="space-y-4">
              <h1 className="font-semibold text-2xl text-[#212121]">
                {productDetailData.title}
              </h1>
              <div className="flex gap-6 text-[#666666] text-sm">
                <div className="flex items-center gap-2">
                  <img src={map} alt="location" className="size-3" />
                  <span>New York, United States</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={calender} alt="date" className="size-3" />
                  <span>Nov 01, 2023, 10:00am</span>
                </div>
              </div>
            </div>

            <img
              src={productDetailData.image}
              alt={productDetailData.title}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          <div className="bg-white border border-[#E1E1E1] rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-[#212121]">Overview</h2>
            <p className="text-[#666666] text-sm font-normal leading-relaxed">
              {productDetailData.description}
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="bg-white border border-[#E1E1E1] rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-[#212121] font-normal text-sm">Price:</p>
                <p className="text-[#F50964] font-semibold text-4xl">
                  ${productDetailData.price.toLocaleString()}
                </p>
              </div>
              <img src={tag} className="w-[40px] h-[40px]" alt="price tag" />
            </div>
          </div>

          <div className="bg-white border border-[#E1E1E1] rounded-lg p-4">
            <div className="flex justify-center items-center">
              <div className="space-y-4 flex flex-col items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfPib7CWEiNiu18DRUk_FDdZR0KNSI4oz_g&s"
                  alt="Profile"
                  className="w-[100px] h-[100px] rounded-full object-cover"
                />
                <p className="font-normal text-[#999999]">
                  Member Since Nov 01, 2023
                </p>

                <div>
                  <p className="font-semibold text-xl text-[#212121]">
                    {ownerName}
                  </p>
                  <p className="font-semibold text-xl text-[#212121]">
                    {customerData.username}
                  </p>
                </div>
                <div className="flex items-center gap-4 p-3 w-full bg-[#2121210A] rounded-lg">
                  <div className="p-2 bg-white rounded-full shadow-lg">
                    <img src={phone} alt="Phone icon" />
                  </div>
                  <div>
                    <button
                      className="font-normal text-sm text-[#999999] hover:text-[#666666]"
                      onClick={() => setShowPhone(!showPhone)}
                      aria-label={
                        showPhone ? "Hide phone number" : "Show phone number"
                      }
                    >
                      {showPhone ? "Hide Number" : "Click to show Number"}
                    </button>
                    <p className="font-semibold text-xl text-[#212121]">
                      {maskedPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 w-full bg-[#2121210A] rounded-lg">
                  <div className="p-2 bg-white rounded-full shadow-lg">
                    <img src={email} alt="Email icon" />
                  </div>
                  <div>
                    <button
                      className="font-normal text-sm text-[#999999] hover:text-[#666666]"
                      onClick={() => setShowEmail(!showEmail)}
                      aria-label={showEmail ? "Hide email" : "Show email"}
                    >
                      {showEmail ? "Hide Email" : "Click to show Email"}
                    </button>
                    <p className="font-semibold text-xl text-[#212121]">
                      {maskedEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
