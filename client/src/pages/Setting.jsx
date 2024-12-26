import { useFormik } from "formik"
import { Button } from "flowbite-react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { updateProfile } from "../api/auth/AuthApi"
import TextInput from "../components/TextInput"
import uploadCare from "../api/uploadCare/uploadImage"


const Setting = () => {

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ name, displayPicture }) => {
            updateProfile(name, displayPicture);
        },
        onSuccess: (data) => {
            console.log(data);
        }
    })

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Full Name is required';
        }
        return errors;
    }

    const handleSubmit = async (values) => {
        try {
            const fileData = await uploadCare.uploadFile(values.displayPicture)
            const displayPicture = fileData.file

            mutation.mutate({ name: values.name, displayPicture });
        } catch (err) {
            toast.error("Image Upload Failed")
            console.error(err)
            throw err;
        }
    }

    const formik = useFormik({
        initialValues: {
            displayPicture: null,
            name: "",
        },
        validate,
        onSubmit: async (values) => {
            await toast.promise(handleSubmit(values), {
                loading: "Updating Profile...",
                success: "Profile Updated Successfully",
                error: (err) => err.response?.data?.message || err.message,
            });
        }
    });

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-24">
                    <h1 className="text-3xl font-bold text-center">Setting</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-8">
                            <TextInput
                                label="Full Name"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.name}
                            />
                        </div>
                        <div className="mt-8">
                            <label htmlFor="displayPicture" className="block text-sm font-medium text-gray-700">
                                Display Picture
                            </label>
                            <div className="mt-1 flex items-center">
                                <input
                                    type="file"
                                    id="displayPicture"
                                    name="displayPicture"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("displayPicture", file);
                                    }}
                                    className="focus:ring-indigo-500 h-12 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button type="submit" className="w-full">
                                Update Profile
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Setting