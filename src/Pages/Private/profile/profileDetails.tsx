import { useQuery } from "@tanstack/react-query";
import { getCustomerDetails } from "../../../Api/Website";
import map from "../../../assets/vector/map.png";
import mail from "../../../assets/vector/mail.png";
import phone from "../../../assets/vector/phon.png";
import AdsListing from "./ads";
import Spinner from "../../../Components/loadingSpinner/spinner";

interface CustomerData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  location?: string;
  phone?: string;
}

type TabType = "profileUpdate" | "profile" | "postAd" | "ads" | "Logout";

interface TabProps {
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileDetails: React.FC<TabProps> = ({ setTab, setEdit, setId }) => {
  const user = JSON.parse(localStorage?.getItem("user") || "{}");

  const { data: customerData, isLoading } = useQuery<CustomerData>({
    queryKey: ["customerDetailsKey", user],
    queryFn: () => getCustomerDetails(),
  });

  const handleEditProfile = () => {
    setTab("profileUpdate");
  };

  const contactDetails = [
    {
      id: 1,
      icon: map,
      alt: "Location",
      value: customerData?.location || "Ash Dr. San Jose, South Dakota",
    },
    {
      id: 2,
      icon: mail,
      alt: "Email",
      value: customerData?.email || "ash@gmail.com",
    },
    {
      id: 3,
      icon: phone,
      alt: "Phone",
      value: customerData?.phone || "(480) 555-0103",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 border-b-4 border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=JSBpwVFm8vz23PZ44Rjn728NwmMtBa_DYL7qxrEWr38="
                alt="Profile"
                className="rounded-full w-15 h-15"
              />

              <div>
                <h2 className="text-xl font-medium text-[#333333]">
                  {customerData?.firstName} {customerData?.lastName}
                </h2>
                <div className="text-[#667085] font-normal text-sm">
                  <p>Member Since</p>
                  <p>
                    {new Date(customerData?.createdAt || "2019").getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleEditProfile}
            className="cursor-pointer px-2 md:px-6 py-2.5 rounded-full border-2 border-gray-200 text-gray-700 font-medium transition-all hover:bg-[#F50964] hover:text-white hover:border-[#F50964]"
            aria-label="Edit Profile"
          >
            Edit Profile
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-wrap gap-4 text-gray-600">
            {contactDetails.map(({ icon, alt, value, id }, index) => (
              <div key={id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={icon} alt={alt} className="w-3 h-3" />
                  <span>{value}</span>
                </div>
                {index < contactDetails.length - 1 && (
                  <div className="hidden md:block h-5 w-[1px] bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdsListing
        setTab={setTab}
        setEdit={setEdit}
        setId={setId}
        tab="profile"
      />
    </div>
  );
};

export default ProfileDetails;
