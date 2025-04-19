import logo from "../../../assets/images/logo.png.png";
import signInVector from "../../../assets/vector/Vector.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center my-4 py-4 px-4 md:px-16 shadow-lg bg-white w-full">
      <img
        src={logo}
        alt="Planet Media Logo"
        className="w-[160px] h-[30px] cursor-pointer"
        onClick={() => navigate("/")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key == "Enter") navigate("/");
        }}
      />

      <nav
        className="flex justify-between gap-4 items-center"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-[#212121]">
          <img src={signInVector} alt="" aria-hidden="true" />
          {!isLoginPage ? (
            <Link to="/login" aria-label="Sign in">
              Sign in
            </Link>
          ) : (
            <Link to="/" aria-label="Return to home">
              Home
            </Link>
          )}
        </div>

        <Link
          to={"/profile"}
          className="cursor-pointer rounded-full bg-[#F50963] text-white px-4 md:px-8 py-2 font-semibold text-sm"
          aria-label="Post new advertisement"
        >
          Post Your Ad
        </Link>
      </nav>
    </header>
  );
};

export default Header;
