import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-4 items-center h-screen justify-center bg-white shadow-lg rounded-lg p-8">
      <p className="text-2xl text-gray-600">Are you sure you want to logout?</p>
      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="cursor-pointer px-6 py-2 text-white bg-[#F50964] rounded-full hover:bg-[#d9085a] transition-colors"
          aria-label="Confirm logout"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="cursor-pointer px-6 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Cancel logout"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
