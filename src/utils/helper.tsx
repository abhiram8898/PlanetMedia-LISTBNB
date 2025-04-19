import { toast } from "react-toastify";

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

export { handleApiError, handleLogout };
