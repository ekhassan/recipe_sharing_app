import { useFormik } from "formik";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query"
import TextInput from "../components/TextInput";
import { signup } from "../api/auth/AuthApi"
import uploadCare from "../api/uploadCare/uploadImage"

const Signup = () => {

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ name, username, email, password, displayPicture }) => signup(name, username, email, password, displayPicture),
    onSuccess: (data) => {
      console.log(data);
      formik.resetForm();
      navigate('/signin');
    }
  });

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    } else if (!/^[a-z0-9_]+$/.test(values.username)) {
      errors.username = 'Username can only contain lowercase letters, numbers and underscores';
    }
    if (!values.name) {
      errors.name = 'Full Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      displayPicture: null,
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      if (!values.displayPicture) {
        toast.error("Image is required");
        return;
      }

      try {

        const fileData = await uploadCare.uploadFile(values.displayPicture);
        const imageUrl = fileData.cdnUrl;

        toast.promise(mutation.mutateAsync({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          displayPicture: imageUrl,
        }), {
          loading: 'Loading...',
          success: 'Sign up successfully',
          error: (err) => (err.response?.data?.message || err.message),
        })

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

  console.log(formik.values)
  console.log(mutation)

  return (
    <main className="mx-5 sm:mx-32">
      <div className="py-24">
        <form className="flex items-center justify-center min-w-full font-medium" onSubmit={formik.handleSubmit}>
          <div className="max-w-3xl ">
            <div className="my-6">
              <h1 className="text-3xl font-medium text-center">Sign Up</h1>
            </div>

            {/* Image Upload Field */}
            <div className="my-6">
              <TextInput
                type="file"
                label="Profile Picture"
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
                placeholder={"e.g. Jhon Doe"}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              ) : null}
            </div>

            {/* Username Field */}
            <div className="my-6">
              <TextInput
                type={"text"}
                name={"username"}
                label={"Username"}
                placeholder={"e.g. johndoe"}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-xs">{formik.errors.username}</div>
              ) : null}
            </div>

            {/* Email Field */}
            <div className="my-6">
              <TextInput
                type={"email"}
                name={"email"}
                label={"Email"}
                placeholder={"e.g. jhondoe@example.com"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Password Field */}
            <div className="my-6">
              <TextInput
                type={"password"}
                name={"password"}
                label={"Password"}
                placeholder={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Confirm Password Field */}
            <div className="my-6">
              <TextInput
                type={"password"}
                name={"confirmPassword"}
                label={"Confirm Password"}
                placeholder={"Confirm Password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-xs">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 w-full"
                color="bg-[#ec4700]"
                pill
                disabled={mutation.isLoading}
              >
                Sign up
              </Button>
            </div>

            {/* Link to Sign In */}
            <div className="my-6">
              Already have an account?{" "}
              <Link to={'/signin'} className="text-[#ec4700] underline hover:no-underline">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
