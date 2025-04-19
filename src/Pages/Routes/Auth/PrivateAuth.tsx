import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthChecker } from "../../../utils/helper";
import Layout from "../../../Components/Layout/layout";

export interface AuthRouteProps {
  loginStatus: boolean;
}
const PrivateAuthProvider = ({ loginStatus }: AuthRouteProps) => {
  const authentification = localStorage?.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    AuthChecker(navigate, authentification, loginStatus);
  }, [loginStatus, authentification, navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateAuthProvider;
