import "../../App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Login from "../Public/login/login";
import PublicAuthProvider from "./Auth/PublicAuthProvider";
import LandingPage from "../Private/Home/LandingPage";
import ProductDetails from "../Private/Home/Products/productDetails";
import Profile from "../Private/profile/profile";
import PrivateAuthProvider from "./Auth/PrivateAuth";
import PostAd from "../Private/profile/PostAd";
import ErrorPage from "../../Components/ErrorPages/errorPage";

const EditAdWrapper = () => {
  const { id } = useParams();
  return <PostAd edit={true} id={id} />;
};

const RoutesHandler = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicAuthProvider />} errorElement={<ErrorPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Route>

        {/* Private routes */}
        <Route
          element={<PrivateAuthProvider loginStatus={true} />}
          errorElement={<ErrorPage />}
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-ad/:id" element={<EditAdWrapper />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default RoutesHandler;
