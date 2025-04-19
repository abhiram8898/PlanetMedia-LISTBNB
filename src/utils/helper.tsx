import { toast } from "react-toastify";

const AuthChecker = (
  navigate: (path: string, options?: { replace?: boolean }) => void,
  token: string | null,
  loginStatus: boolean
): void => {
  // For private routes (loginStatus = true)
  if (loginStatus && !token) {
    toast.error("Please login to access this page");
    navigate("/login", { replace: true });
    return;
  }
};

const handleApiError = (error: {
  response?: { status: number; data?: { message?: string } };
}) => {
  let errorMessage = "An error occurred";
  if (error?.response) {
    if (error?.response?.status === 409) {
      errorMessage =
        "Conflict error: " +
        (error?.response?.data?.message || "Please try again later.");
    } else {
      errorMessage = error?.response?.data?.message || errorMessage;
    }
  }
  toast.error(errorMessage, { toastId: "error-occurred" });
};

const handleLogout = (
  navigate: (path: string, options?: { replace?: boolean }) => void
) => {
  localStorage.removeItem("token");
  navigate("/", { replace: true });
};

export { AuthChecker, handleApiError, handleLogout };
