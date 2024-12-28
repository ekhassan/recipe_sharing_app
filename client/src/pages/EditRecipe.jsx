import { Button, Checkbox, Label } from "flowbite-react";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useFormik } from "formik";

import Editor from "../components/Editor";
import TextInput from "../components/TextInput";
import { getRecipe, updateRecipe } from "../api/recipe/recipeApi";
import Loading from "../components/Loading";
import TagInput from "../components/TagInput";
import uploadCare from "../api/uploadCare/uploadImage"



const EditRecipe = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipe(id),
        enabled: !!id
    })

    const recipe = data?.recipe

    const mutation = useMutation({
        mutationFn: ({ image, title, ingredients, details, directions, under30min, notes, tags }) => toast.promise(updateRecipe(id, image, title, ingredients, details, notes, directions, under30min, tags),
            {
                loading: "Updating Recipe...",
                success: "Recipe Updated",
                error: (err) => toast.error(err.response?.data?.message || err.message)
            }),
        onSuccess: () => {
            navigate(`/detail/${id}`)
        }
    })

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
            title: '',
            image: '',
            notes: '',
            ingredients: '',
            details: '',
            directions: '',
            under30min: false,
            tags: [],
        },
        validate,
        onSubmit: async (values) => {

            if (!Array.isArray(values.tags)) {
                values.tags = [];
            }
            let imageUrl = recipe?.image;
            try {
                if (values.image) {
                    const fileData = await uploadCare.uploadFile(values.image);
                    imageUrl = fileData.cdnUrl;
                }

                mutation.mutateAsync({
                    title: values.title,
                    image: imageUrl,
                    notes: values.notes,
                    ingredients: values.ingredients,
                    details: values.details,
                    directions: values.directions,
                    under30min: values.under30min,
                    tags: values.tags,
                })
            } catch (err) {
                toast.error("Image upload failed");
                console.error(err);
            }
        },
    });

    if (recipe && !formik.values.title) {
        formik.setValues({
            title: recipe.title,
            image: recipe.image,
            notes: recipe.notes,
            ingredients: recipe.ingredients,
            details: recipe.details,
            directions: recipe.directions,
            under30min: recipe.under30min || false,
            tags: recipe.tags || [],
        });
    }

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        toast.error(error);
    }

    const handleDisplayPicture = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("image", file);
    };
    console.log(mutation)

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-24">
                    <h1 className="text-3xl font-medium mb-10 text-center">Edit Recipe</h1>
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
                        <h2 className="text-xl font-bold">Dish Picture</h2>
                        <TextInput
                            value={formik.values.image}
                            name={'image'}
                            type={"file"}
                            onChange={handleDisplayPicture}
                            onBlur={formik.handleBlur}
                        />

                        <h2 className="text-xl font-bold">Your Notes</h2>
                        <TextInput
                            name={'notes'}
                            type={'text'}
                            placeholder={"Some extra instructions to your viewers."}
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <h2 className="text-xl font-bold">Recipe</h2>

                        <h3 className="my-2 font-medium">Details</h3>
                        <Editor
                            name={"details"}
                            placeholder={"Details like Servings, Cook time, Preparation time etc."}
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <h3 className="my-2 font-medium">Ingredients</h3>
                        <Editor
                            name={"ingredients"}
                            placeholder={"Things you need to make this dish."}
                            value={formik.values.ingredients}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <h3 className="my-2 font-medium">Directions</h3>
                        <Editor
                            name={"directions"}
                            placeholder={"Direction is all about, the complete process."}
                            value={formik.values.directions}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

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
                            <Button type="submit" className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 float-end my-6" pill color='bg-[#ec4700]' disabled={mutation.isLoading}>Update Recipe</Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default EditRecipe;