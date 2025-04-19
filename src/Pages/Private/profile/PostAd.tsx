import { Formik } from "formik";
import { adSubmitHandler } from "./submitHandler/submithandler";
import * as yup from "yup";
import { getSingleAdvertisementsDetails } from "../../../Api/Website";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "../../../Components/loadingSpinner/spinner";
import Input from "../../../Components/input/input";
import { useNavigate } from "react-router-dom";

interface AdData {
  title: string;
  description: string;
  image: string;
  price: number;
}

const postAdScheme = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  image: yup.string().required("Image is required").url("Must be a valid URL"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be positive")
    .typeError("Price must be a number"),
});

const PostAd = ({ edit = false, id }: { edit?: boolean; id?: string }) => {
  const navigate = useNavigate();

  const { data: productDetailData, isLoading } = useQuery({
    queryKey: ["productDetailKey", id],
    queryFn: () => getSingleAdvertisementsDetails(id),
    enabled: edit && !!id,
  });

  const { mutate: submitAd, isError: submitError } = useMutation({
    mutationFn: (values: AdData) => adSubmitHandler(values),
    onSuccess: () => {
      navigate("/profile");
    },
    onError: (error) => {
      console.error("Error submitting ad:", error);
    },
  });

  if (edit && isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const initialValues: AdData = {
    title: edit && productDetailData ? productDetailData.title : "",
    description: edit && productDetailData ? productDetailData.description : "",
    image: edit && productDetailData ? productDetailData.image : "",
    price: edit && productDetailData ? productDetailData.price : 0,
  };

  return (
    <div className="p-8 space-y-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        {edit ? "Edit Advertisement" : "Post New Advertisement"}
      </h1>

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          Failed to {edit ? "update" : "create"} advertisement. Please try
          again.
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={postAdScheme}
        onSubmit={(values, { setSubmitting }) => {
          submitAd(values);
          setSubmitting(false);
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
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="type here"
                label="Ad Title"
                required
                aria-label="Advertisement title"
              />
              {errors.title && touched.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-medium">
                Description <span className="text-[#F50964]">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="type here"
                value={values.description}
                onChange={handleChange}
                rows={6}
                className={`border-2 rounded-md p-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-[#F50964] ${
                  errors.description && touched.description
                    ? "border-red-500"
                    : "border-[#E1E1E1]"
                }`}
                aria-label="Advertisement description"
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm">{errors.description}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="url"
                name="image"
                id="image"
                placeholder="paste image url here"
                value={values.image}
                onChange={handleChange}
                label="Photo URL"
                required
                aria-label="Advertisement image URL"
              />
              {errors.image && touched.image && (
                <div className="text-red-500 text-sm">{errors.image}</div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="type here"
                value={values.price}
                onChange={handleChange}
                label="Price"
                required
                aria-label="Advertisement price"
              />
              {errors.price && touched.price && (
                <div className="text-red-500 text-sm">{errors.price}</div>
              )}
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F50964] text-white px-6 py-2 rounded-md disabled:opacity-50 cursor-pointer hover:bg-[#d9085a] transition-colors"
              >
                {isSubmitting ? "Saving..." : edit ? "Update Ad" : "Post Ad"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PostAd;
