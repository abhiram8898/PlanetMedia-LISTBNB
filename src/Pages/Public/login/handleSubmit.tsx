import { toast } from "react-toastify";
import { api } from "../../../Api/Api";
import { handleApiError } from "../../../utils/helper";

//generate email otp
interface RegisterData {
  username: string;
  password: string;
  email: string;
}

interface LoginData {
  identifier: string;
  password: string;
}
export const registerSubmitHandler = async (data: RegisterData) => {
  try {
    const [success] = await api.post(`api/auth/local/register`, data, false);

    if (success) {
      toast.success("User Registered Successfully");
    } else {
      toast.error("Failed to Register User");
    }
  } catch (error) {
    handleApiError(
      error as { response?: { status: number; data?: { message?: string } } }
    );
  }
};

export const loginSubmitHandler = async (
  data: LoginData,
  navigate: (path: string, options?: { replace?: boolean }) => void
) => {
  try {
    const [success, response] = await api.post(`api/auth/local`, data, false);

    if (success) {
      toast.success("User Login Successfully");
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user?.id));
      navigate("/profile", { replace: true });
    } else {
      toast.error("Failed to Login User");
    }
  } catch (error) {
    handleApiError(
      error as { response?: { status: number; data?: { message?: string } } }
    );
  }
};
