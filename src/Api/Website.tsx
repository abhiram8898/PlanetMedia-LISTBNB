import { api } from "./Api";
import { handleApiError } from "../utils/helper";
import { toast } from "react-toastify";

// Define error interface
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export async function getAllAdvertisementsDetails() {
  try {
    const [, data] = await api.get(`api/advertisements`, false);
    if (data) {
      return data;
    }
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (
      apiError?.response?.data?.message ===
      "Full authentication is required to access this resource"
    ) {
      toast.warning("Token expired or invalid token please login");
    } else {
      handleApiError(
        error as { response?: { status: number; data?: { message?: string } } }
      );
    }
  }
}

export async function getSingleAdvertisementsDetails(id: string | undefined) {
  try {
    const [, data] = await api.get(`api/advertisements/${id}`, false);
    if (data) {
      return data;
    }
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (
      apiError?.response?.data?.message ===
      "Full authentication is required to access this resource"
    ) {
      toast.warning("Token expired or invalid token please login");
    } else {
      handleApiError(
        error as { response?: { status: number; data?: { message?: string } } }
      );
    }
  }
}

export async function getCustomerDetails() {
  try {
    const [, data] = await api.get(`api/profile`, true);
    if (data) {
      return data;
    }
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (
      apiError?.response?.data?.message ===
      "Full authentication is required to access this resource"
    ) {
      toast.warning("Token expired or invalid token please login");
    } else {
      handleApiError(
        error as { response?: { status: number; data?: { message?: string } } }
      );
    }
  }
}
