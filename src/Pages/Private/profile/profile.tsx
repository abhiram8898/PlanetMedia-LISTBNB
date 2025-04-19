import ProfileForm from "./profileForm";
import { useState } from "react";
import ProfileDetails from "./profileDetails";
import Breadcrumb from "../../../Components/BreadCrumbs/breadcrumb";
import PostAd from "./PostAd";
import Logout from "./Logout";
import { motion } from "framer-motion";
import AdsListing from "./ads";
import { TabButtonProps } from "../../../utils/type";

type TabType = "profile" | "profileUpdate" | "postAd" | "ads" | "Logout";

const TabButton = ({ tab, currentTab, onClick, children }: TabButtonProps) => (
  <li className="w-full">
    <button
      onClick={onClick}
      className={`cursor-pointer p-2 w-full text-left pl-8 rounded-lg hover:bg-[#212121] hover:text-white hover:rounded-full group ${
        currentTab === tab ? "text-[#F50964]" : "text-gray-900"
      }`}
    >
      {children}
    </button>
  </li>
);

function Profile() {
  const [tab, setTab] = useState<TabType>("profile");

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabButtons = [
    { tab: "profile" as TabType, label: "My Account" },
    { tab: "profileUpdate" as TabType, label: "Profile" },
    { tab: "ads" as TabType, label: "Ads" },
    { tab: "postAd" as TabType, label: "Post Ad" },
    { tab: "Logout" as TabType, label: "Logout" },
  ];

  const renderContent = () => {
    switch (tab) {
      case "profile":
        return (
          <ProfileDetails setTab={setTab} setEdit={setEdit} setId={setId} />
        );
      case "profileUpdate":
        return <ProfileForm />;
      case "postAd":
        return <PostAd edit={edit} id={id} />;
      case "ads":
        return (
          <AdsListing
            setTab={setTab}
            setEdit={setEdit}
            setId={setId}
            tab={tab}
          />
        );
      case "Logout":
        return <Logout />;
    }
  };

  return (
    <>
      <Breadcrumb tab={tab} />
      <div className="relative">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-25 right-4 z-50 bg-[#F50964] text-white p-2 rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div className="flex flex-col md:grid md:grid-cols-9 gap-4 min-h-screen">
          {/* Sidebar */}
          <div
            className={`fixed md:relative md:col-span-2 w-full md:w-auto transition-transform duration-300 ease-in-out z-40 ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            <aside id="default-sidebar" aria-label="Sidebar" className="h-full">
              <div className="h-full w-full py-6 px-4 overflow-y-auto bg-white shadow-lg rounded-lg">
                <ul className="space-y-6 font-medium">
                  {tabButtons.map(({ tab: tabType, label }) => (
                    <TabButton
                      key={tabType}
                      tab={tabType}
                      currentTab={tab}
                      onClick={() => {
                        setTab(tabType);
                        setIsSidebarOpen(false);
                      }}
                    >
                      {label}
                    </TabButton>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* Main Content */}
          <motion.div
            key={tab}
            className="md:col-span-7 px-0 md:px-4 rounded-lg h-full w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Profile;
