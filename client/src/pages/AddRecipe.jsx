import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button, Checkbox, Label } from "flowbite-react";
import Editor from "../components/Editor";
import TextInput from "../components/TextInput";
import { createRecipe } from "../api/recipe/recipeApi";
import uploadCare from "../api/uploadCare/uploadImage";
import TagInput from "../components/TagInput";

const AddRecipe = () => {
    const mutation = useMutation({
        mutationFn: ({ image, title, ingredients, details, directions, under30min, notes, tags }) =>
            createRecipe(image, title, ingredients, details, notes, directions, under30min, tags),
        onSuccess: (data) => {
            formik.resetForm();
            console.log(data);
        },
    });

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title is required";
        }
        if (!values.image) {
            errors.image = "Image is required";
        }
        if (!values.notes) {
            errors.notes = "Notes is required";
        }
        if (!values.ingredients) {
            errors.ingredients = "Ingredients is required";
        }
        if (!values.details) {
            errors.details = "Details is required";
        }
        if (!values.directions) {
            errors.directions = "Directions is required";
        }
        if (!values.tags || !Array.isArray(values.tags) || values.tags.length === 0) {
            errors.tags = "Tags is required";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            image: null,
            notes: "",
            ingredients: "",
            details: "",
            directions: "",
            under30min: false,
            tags: [],
        },
        validate,
        onSubmit: async (values) => {
            if (!values.image) {
                toast.error("Image is required");
                return;
            }
            if (!Array.isArray(values.tags)) {
                values.tags = [];
            }
            try {
                const fileData = await uploadCare.uploadFile(values.image);
                const imageUrl = fileData.cdnUrl;

                console.log(imageUrl);

                toast.promise(
                    mutation.mutateAsync({
                        title: values.title,
                        image: imageUrl,
                        notes: values.notes,
                        ingredients: values.ingredients,
                        details: values.details,
                        directions: values.directions,
                        under30min: values.under30min,
                        tags: values.tags,
                    }),
                    {
                        loading: "Adding Recipe...",
                        success: "Recipe created successfully!",
                        error: (err) => err.response?.data?.message || err.message,
                    }
                );
            } catch (err) {
                toast.error("Image upload failed");
                console.error(err);
            }
        },
    });


    const handleDisplayPicture = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("image", file);
    };


    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-24">
                    <h1 className="text-3xl font-medium mb-10 text-center">Add Recipe</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className="text-xl font-bold">Recipe Title</h2>
                        <TextInput
                            name={'title'}
                            type={"text"}
                            placeholder={"Title of the Recipe"}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-red-500 text-xs mb-3">{formik.errors.title}</div>
                        ) : null}

                        <h2 className="text-xl font-bold">Dish Picture</h2>
                        <TextInput
                            name={'image'}
                            type={"file"}
                            onChange={handleDisplayPicture}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.image && !formik.values.image ? (
                            <div className="text-red-500 text-xs">Image is required</div>
                        ) : null}

                        <h2 className="text-xl font-bold">Your Notes</h2>
                        <TextInput
                            name={'notes'}
                            type={'text'}
                            placeholder={"Some extra instructions to your viewers."}
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.notes && formik.errors.notes ? (
                            <div className="text-red-500 text-xs mb-3">{formik.errors.notes}</div>
                        ) : null}

                        <h2 className="text-xl font-bold">Recipe</h2>

                        <h3 className="my-2 font-medium">Details</h3>
                        <Editor
                            name="details"
                            placeholder={"Details like Servings, Cook time, Preparation time etc."}
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.details && formik.errors.details ? (
                            <div className="text-red-500 text-xs mb-3">{formik.errors.details}</div>
                        ) : null}

                        <h3 className="my-2 font-medium">Ingredients</h3>

                        <Editor
                            name="ingredients"
                            placeholder={"Things you need to make this dish."}
                            value={formik.values.ingredients}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.ingredients && formik.errors.ingredients ? (
                            <div className="text-red-500 text-xs mb-3">{formik.errors.ingredients}</div>
                        ) : null}

                        <h3 className="my-2 font-medium">Directions</h3>
                        <Editor
                            name="directions"
                            placeholder={"Direction is all about, the complete process."}
                            value={formik.values.directions}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.directions && formik.errors.directions ? (
                            <div className="text-red-500 text-xs mb-3">{formik.errors.directions}</div>
                        ) : null}

                        <h3 className="my-2 font-medium">Tags</h3>
                        <TagInput
                            name="tags"
                            value={formik.values.tags}
                            onChange={(name, value) => formik.setFieldValue(name, value)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.tags && formik.errors.tags ? (
                            <div className="text-red-500 text-xs mb-3">{formik.errors.tags}</div>
                        ) : null}
                        <div className="flex  items-center gap-4">
                            <Checkbox id="accept"
                                checked={formik.values.under30min}
                                onChange={() => formik.setFieldValue('under30min', !formik.values.under30min)}
                                color="bg-[#ec4700]" className="checked:bg-[#ec4700] focus:ring-2 focus:ring-[#ec4700]  transform scale-120" />
                            <Label htmlFor="accept" className="flex">
                                <h3 className="my-2 font-medium text-lg">Can your recipe be done in <span className="font-bold text-[#ec4700]">Under 30 minutes</span> ?</h3>
                            </Label>
                        </div>
                        <div>
                            <Button
                                className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 float-end my-6"
                                pill
                                type="submit"
                                color='bg-[#ec4700]'
                                disabled={mutation.isLoading}
                            >
                                Add Recipe
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default AddRecipe;