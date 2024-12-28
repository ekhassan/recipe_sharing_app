import { useFormik } from "formik"
import { Button, Card } from "flowbite-react"
import { toast } from "react-hot-toast"
// import { useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"

import { getUser, updateProfile } from "../api/auth/AuthApi"
import TextInput from "../components/TextInput"
import uploadCare from "../api/uploadCare/uploadImage"


const Setting = () => {

    // const navigate = useNavigate();

    const { data: userData } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    });

    const user = userData?.user;



    const mutation = useMutation({
        mutationFn: ({ name, displayPicture }) => {
            updateProfile(name, displayPicture);
        },
        onSuccess: () => {
            // console.log(data);
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
            displayPicture: "",
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

    if (user && !formik.values.name) {
        formik.setValues({
            name: user?.name,
            displayPicture: user?.displayPicture,
        });
    }

    

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-24">
                    <h1 className="text-3xl py-5 font-medium text-center">Settings</h1>

                    <Card className="bg-[#fdfaf5] rounded-3xl px-5">
                        <form onSubmit={formik.handleSubmit}>
                            <h2 className="text-2xl font-medium">Update Profile</h2>
                            <div className="flex justify-center py-5">
                                <div className="w-56 h-56 rounded-full">
                                    <img src={user?.displayPicture} alt="" className="w-full h-full object-cover rounded-full" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                                <TextInput
                                    type="file"
                                    label={"Profile Picture"}
                                    id="displayPicture"
                                    name="displayPicture"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        formik.setFieldValue("displayPicture", file);
                                    }}
                                    className="focus:ring-indigo-500 h-12 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
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

                                <TextInput
                                    label="Email"
                                    id="email"
                                    name={"email"}
                                    type={"email"}
                                    value={user?.email}
                                />
                                <TextInput
                                    label="Username"
                                    id="username"
                                    name={"username"}
                                    type={"text"}
                                    value={user?.username}
                                    required
                                />
                            </div>
                            <div className="mt-8 float-end">
                                <Button
                                    type="submit"
                                    className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 w-full"
                                    color="bg-[#ec4700]"
                                    pill
                                    disabled={mutation.isLoading}
                                >
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default Setting