import { useState } from "react";
import logo from "../../../assets/images/logo.png.png";
import loginImage from "../../../assets/images/thumb-1-1.png.png";
import arrow from "../../../assets/vector/VectorArrow.png";
import { loginSubmitHandler, registerSubmitHandler } from "./handleSubmit";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "../../../Components/input/input";
import { useMutation } from "@tanstack/react-query";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface FormValues {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(true);

  const loginMutation = useMutation({
    mutationFn: (loginData: { identifier: string; password: string }) =>
      loginSubmitHandler(loginData, navigate),
  });

  const registerMutation = useMutation({
    mutationFn: (registerData: RegisterData) =>
      registerSubmitHandler(registerData),
  });

  const handleRegister = () => {
    setLogin(!login);
  };

  const handleSubmit = async (values: FormValues, resetForm: () => void) => {
    if (login) {
      const loginData = {
        identifier: values.username,
        password: values.password,
      };
      loginMutation.mutate(loginData, {
        onSuccess: () => {
          resetForm();
        },
      });
    } else {
      const registerData: RegisterData = {
        username: values.username,
        password: values.password,
        email: values.email,
      };
      registerMutation.mutate(registerData, {
        onSuccess: () => {
          resetForm();
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-15">
      <div className="flex flex-col md:flex-row justify-center gap-8 items-center w-[1287px] rounded-4xl border border-[#DFDFDF]">
        <div className="flex flex-col justify-center items-center space-y-8 w-full md:w-1/2 p-8">
          <img src={logo} alt="Logo" className="w-[186px]" />
          <div className="text-center font-normal text-base text-[#666666]">
            <p>
              <span className="font-bold text-[#212121] text-base">
                Listbnb{" "}
              </span>
              a Largest Classified Listing Marketplace offers perfect
            </p>
            <p>Ads classifieds...</p>
          </div>

          <div className="text-2xl font-semibold text-[#212121] flex flex-col justify-center items-center">
            {login ? (
              <>
                <p>Login To Your</p>
                <p>Account</p>
              </>
            ) : (
              <>
                <p>Create Your</p>
                <p>Account</p>
              </>
            )}
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
              confirmPassword: "",
            }}
            validationSchema={login ? loginSchema : registerSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm);
            }}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                className="flex flex-col gap-4 w-full text-[#212121] font-medium"
              >
                {!login && (
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Type your email"
                    label="Email"
                    error={touched.email && errors.email}
                    required
                  />
                )}
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Type your username"
                  label="Username"
                  error={touched.username && errors.username}
                  required
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Type your password"
                  label="Password"
                  error={touched.password && errors.password}
                  required
                />

                {!login && (
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Type your password"
                    label="Confirm Password"
                    error={touched.confirmPassword && errors.confirmPassword}
                    required
                  />
                )}
                <button
                  type="submit"
                  className="bg-[#F50964] cursor-pointer rounded-full text-white px-4 py-2 mt-4 hover:bg-[#d80857] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    loginMutation.isPending || registerMutation.isPending
                  }
                >
                  <div className="flex items-center justify-center gap-2">
                    {login ? (
                      <>
                        Login <img src={arrow} alt="Arrow" />
                      </>
                    ) : (
                      <>
                        Register <img src={arrow} alt="Arrow" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            )}
          </Formik>
        </div>

        <div className="bg-[#F50964]/[0.04] p-8 flex flex-col gap-4 items-center justify-center rounded-[14px] w-full md:w-1/2">
          <img
            src={loginImage}
            alt="Login illustration"
            className="w-[325px] h-[344px]"
          />
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#212121]">
              {login ? "Don't have an account" : "Already Have an Account"}{" "}
              <span className="text-[#F50964]">?</span>
            </p>
            <div className="flex flex-col gap-2 font-normal text-base text-[#666666] my-6">
              <p>To connect with us please register for a new</p>
              <p>account if you are not having one already.</p>
            </div>
            <button
              onClick={handleRegister}
              className="bg-[#F50964] cursor-pointer rounded-full text-white px-4 py-2 mt-4 hover:bg-[#d80857] transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                {!login ? (
                  <>
                    Login <img src={arrow} alt="Arrow" />
                  </>
                ) : (
                  <>
                    Register <img src={arrow} alt="Arrow" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
