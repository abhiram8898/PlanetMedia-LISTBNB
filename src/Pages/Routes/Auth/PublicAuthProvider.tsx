import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../../Components/Layout/layout";
import { useEffect } from "react";
import { toast } from "react-toastify";

export interface AuthRouteProps {
  loginStatus: boolean;
}

const PublicAuthProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (window.location.pathname === "/login" && token) {
      toast.info("You are already logged in. Please logout first.");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicAuthProvider;
