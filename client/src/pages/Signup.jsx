
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query"
import { signup } from "../api/auth/AuthApi"
import uploadCare from "../api/uploadCare/uploadImage"

const Signup = () => {

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ username, email, password, displayPicture }) =>
      toast.promise(signup(username, email, password, displayPicture), {
        loading: 'Loading...',
        success: 'Sign up successfully',
        error: (err) => (err.response?.data?.message || err.message),
      }),
    onSuccess: (data) => {
      console.log(data);
      navigate('/');
    }
  });
  const formik = useFormik({
    initialValues: {
      displayPicture: null,
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Check if image is uploaded
      if (!values.displayPicture) {
        toast.error("Image is required");
        return;
      }

      try {
        // Upload the image file
        const fileData = await uploadCare.uploadFile(values.displayPicture);
        const imageUrl = fileData.cdnUrl;

        await mutation.mutateAsync({
          username: values.username,
          email: values.email,
          password: values.password,
          displayPicture: imageUrl,
        });
      } catch (error) {
        toast.error("Image upload failed");
        console.error(error);
      }
    },
  });

  const handleDisplayPicture = (event) => {
    const file = event.target.files[0];
    console.log(file.name);

    formik.setFieldValue("displayPicture", file);
  };

  return (
    <main className="mx-5 sm:mx-32">
      <form className="flex items-center justify-center min-w-full font-medium" onSubmit={formik.handleSubmit}>
        <div className="max-w-3xl ">
          <div className="my-6">
            <h1 className="text-3xl font-medium text-center">Sign Up</h1>
          </div>

          {/* Image Upload Field */}
          <div className="my-6">
            <TextInput
              type="file"
              label="Upload Image"
              name="displayPicture"
              onChange={handleDisplayPicture}
              onBlur={formik.handleBlur} // Add this line for handling blur events
            />
            {formik.touched.displayPicture && !formik.values.displayPicture ? (
              <div className="text-red-500 text-xs">Image is required</div>
            ) : null}
          </div>

          {/* Full Name Field */}
          <div className="my-6">
            <TextInput
              type={"text"}
              name={"name"}
              label={"Full Name"}
              placeholder={""}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && !formik.values.name ? (
              <div className="text-red-500 text-xs">Full Name is required</div>
            ) : null}
          </div>

          {/* Username Field */}
          <div className="my-6">
            <TextInput
              type={"text"}
              name={"username"}
              label={"Username"}
              placeholder={""}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && !formik.values.username ? (
              <div className="text-red-500 text-xs">Username is required</div>
            ) : null}
          </div>

          {/* Email Field */}
          <div className="my-6">
            <TextInput
              type={"email"}
              name={"email"}
              label={"Email"}
              placeholder={""}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && !formik.values.email ? (
              <div className="text-red-500 text-xs">Email is required</div>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="my-6">
            <TextInput
              type={"password"}
              name={"password"}
              label={"Password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && !formik.values.password ? (
              <div className="text-red-500 text-xs">Password is required</div>
            ) : null}
          </div>

          {/* Confirm Password Field */}
          <div className="my-6">
            <TextInput
              type={"password"}
              name={"confirmPassword"}
              label={"Confirm Password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && !formik.values.confirmPassword ? (
              <div className="text-red-500 text-xs">Confirm Password is required</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 w-full"
              color="bg-[#ec4700]"
              pill
            >
              Sign up
            </Button>
          </div>

          {/* Link to Sign In */}
          <div className="my-6">
            Already have an account?{" "}
            <Link to={'/signin'} className="text-[#ec4700]">Sign In</Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Signup;