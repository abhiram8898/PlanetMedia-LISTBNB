import { toast } from "react-toastify";
import { api } from "../../../../Api/Api";
import { handleApiError } from "../../../../utils/helper";

interface AdData {
  title: string;
  description: string;
  image: string;
  price: number;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export const adSubmitHandler = async (data: AdData) => {
  try {
    const [success] = await api.post(`api/advertisements`, data, true);

    if (success) {
      toast.success("Ad Posted Successfully");
    } else {
      toast.error("Failed to Post Ad");
    }
  } catch (error) {
    handleApiError(
      error as { response?: { status: number; data?: { message?: string } } }
    );
  }
};

export const adDeleteSubmitHandler = async (
  id: string,
  refetchProducts: () => void
) => {
  try {
    const [success] = await api.delete(`api/advertisements/${id}`, true);

    if (success) {
      toast.success("Ad Deleted Successfully");
      refetchProducts();
    } else {
      toast.error("Failed to Delete Ad");
    }
  } catch (error) {
    handleApiError(
      error as { response?: { status: number; data?: { message?: string } } }
    );
  }
};

export const profileUpdateSubmitHandler = async (data: ProfileData) => {
  try {
    const [success] = await api.put(`api/profile`, data, true);

    if (success) {
      toast.success("Profile Updated Successfully");
    } else {
      toast.error("Failed to Update Profile");
    }
  } catch (error) {
    handleApiError(
      error as { response?: { status: number; data?: { message?: string } } }
    );
  }
};
