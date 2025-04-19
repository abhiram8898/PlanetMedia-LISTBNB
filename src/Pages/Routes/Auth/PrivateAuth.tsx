import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../../Components/Layout/layout";
import { toast } from "react-toastify";

export interface AuthRouteProps {
  loginStatus: boolean;
}

const PrivateAuthProvider = ({ loginStatus }: AuthRouteProps) => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage?.getItem("token");

    if (!token && loginStatus) {
      toast.error("Please login to access this page");
      navigate("/login", { replace: true });
    } else {
      setCheckingAuth(false);
    }
  }, [navigate, loginStatus]);

  if (checkingAuth) return null;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateAuthProvider;
