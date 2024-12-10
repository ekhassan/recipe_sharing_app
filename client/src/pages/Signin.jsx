import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../api/auth/AuthApi";
import TextInput from "../components/TextInput";

import useAuthStore from "../store/useAuthStore"

const Signin = () => {

    const navigate = useNavigate();
    const { login } = useAuthStore();

    const mutation = useMutation({
        mutationFn: ({ email, password }) => toast.promise(signin(email, password), {
            loading: 'Loading...',
            success: 'Sign in successfully',
            error: (err) => (err.response?.data?.message || err.message),
        }),
        onSuccess: (data) => {
            console.log(data);
            login(data.token);
            navigate('/');
        }
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            mutation.mutate(values);
        },
    });

    return (
        <main className="mx-5 sm:mx-32">
            <div className="flex items-center justify-center">
                <form className="font-medium" onSubmit={formik.handleSubmit}>
                    <div className="my-12">
                        <h1 className="text-3xl font-medium text-center">Sign In</h1>
                    </div>

                    {/* Email Field */}
                    <div>
                        <TextInput
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    {/* Password Field */}
                    <div className="mt-4">
                        <TextInput
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 w-full"
                            color="bg-[#ec4700]"
                            pill
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>

                    <div className="my-6 text-center">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-[#ec4700]">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Signin;