import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../../Components/Layout/layout";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PublicAuthProvider = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoginPage = window.location.pathname === "/login";

  useEffect(() => {
    if (token && isLoginPage) {
      navigate("/");
      toast.error("You are already logged in, please logout to login again.");
    }
  }, [token, navigate, isLoginPage]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicAuthProvider;
