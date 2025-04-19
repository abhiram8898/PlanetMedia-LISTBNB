import { Formik } from "formik";
import * as Yup from "yup";
import { profileUpdateSubmitHandler } from "./submitHandler/submithandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../../../Components/input/input";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  username: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  location?: string;
  phone?: string;
  username: string;
}

const ProfileForm = () => {
  const queryClient = useQueryClient();

  const customerData = queryClient.getQueryData<CustomerData>([
    "customerDetailsKey",
  ]);

  const { mutate: updateProfile } = useMutation({
    mutationFn: (values: ProfileData) => profileUpdateSubmitHandler(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerDetailsKey"] });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    location: Yup.string().required("Location is required"),
    username: Yup.string().required("Username is required"),
  });

  const initialValues: ProfileData = {
    firstName: customerData?.firstName || "",
    lastName: customerData?.lastName || "",
    email: customerData?.email || "",
    phone: customerData?.phone || "",
    location: customerData?.location || "",
    username: customerData?.username || "",
  };

  return (
    <div className="p-8 space-y-4 bg-white shadow-lg rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          updateProfile(values);
          resetForm();
        }}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="type here"
                required
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-500 text-sm">{errors.firstName}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="type here"
                required
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 text-sm">{errors.lastName}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="type here"
                required
                label="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="type here"
                required
                label="Username"
                value={values.username}
                onChange={handleChange}
              />
              {errors.username && touched.username && (
                <div className="text-red-500 text-sm">{errors.username}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="location"
                id="location"
                placeholder="type here"
                required
                label="Location"
                value={values.location}
                onChange={handleChange}
              />
              {errors.location && touched.location && (
                <div className="text-red-500 text-sm">{errors.location}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="tel"
                name="phone"
                id="phone"
                placeholder="type here"
                required
                label="Contact Number"
                value={values.phone}
                onChange={handleChange}
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-sm">{errors.phone}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#F50964] rounded-full text-white px-4 py-2 hover:bg-[#d80857] transition-colors w-full"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
