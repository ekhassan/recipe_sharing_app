import { useState, useEffect } from "react";
import Editor from "../components/Editor";
import TextInput from "../components/TextInput";
import { Button } from "flowbite-react";

const EditRecipe = () => {
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch recipe data from the API
    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const response = await fetch("https://api.example.com/recipe/1"); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setIngredients(data.ingredients || '');
                setDirections(data.directions || '');
                setDetails(data.details || '');
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeData();
    }, []); // Empty dependency array means this runs once on mount

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ ingredients, directions, details });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="my-10 ">
                    <h1 className="text-3xl font-medium mb-10 text-center">Edit Recipe</h1>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold">Dish Picture</h2>
                        <TextInput name={'img'} type={"file"} />

                        <h2 className="text-xl font-bold">Your Notes</h2>
                        <TextInput name={'notes'} type={'text'} placeholder={"Some extra instructions to your viewers."} />

                        <h2 className="text-xl font-bold">Recipe</h2>

                        <h3 className="my-2 font-medium">Details</h3>
                        <Editor
                            placeholder={"Details like Servings, Cook time, Preparation time etc."}
                            value={details}
                            onChange={setDetails}
                        />

                        <h3 className="my-2 font-medium">Ingredients</h3>
                        <Editor
                            placeholder={"Things you need to make this dish."}
                            value={ingredients}
                            onChange={setIngredients}
                        />

                        <h3 className="my-2 font-medium">Directions</h3>
                        <Editor
                            placeholder={"Direction is all about, the complete process."}
                            value={directions}
                            onChange={setDirections}
                        />

                        <div>
                            <Button type="submit" className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 float-end my-6" pill color='bg-[#ec4700]'>Update Recipe</Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default EditRecipe;