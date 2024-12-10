import { useState } from "react";
import Editor from "../components/Editor"
import TextInput from "../components/TextInput";
import { Button } from "flowbite-react";

const AddRecipe = () => {


    const [ingredients, setIngredients] = useState();
    const [directions, setDirections] = useState();
    const [details, setDetails] = useState();

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="my-10 ">
                    <h1 className="text-3xl font-medium mb-10 text-center">Add Recipe</h1>
                    <form >
                        <h2 className="text-xl font-bold">Recipe Title</h2>
                        <TextInput name={'title'} type={"text"} placeholder={"Title of the Recipe"} />
                        <h2 className="text-xl font-bold">Dish Picture</h2>
                        <TextInput name={'img'} type={"file"} />

                        <h2 className="text-xl font-bold">Your Notes</h2>
                        <TextInput name={'notes'} type={'text'} placeholder={"Some extra insturctions to your viwers."} />

                        <h2 className="text-xl font-bold">Recipe</h2>

                        <h3 className="my-2 font-medium">Details</h3>
                        <Editor
                            placeholder={"Details like Servings, Cook time, Preparation time etc."}
                            onChange={setDetails}
                        />

                        <h3 className="my-2 font-medium">Ingredients</h3>
                        <Editor
                            placeholder={"Things you need to make this dish."}
                            onChange={setIngredients}
                        />

                        <h3 className="my-2 font-medium">Directions</h3>
                        <Editor
                            placeholder={"Direction is all about, the complete process."}
                            onChange={setDirections}
                        />

                        <div >
                            <Button className="bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 float-end my-6" pill color='bg-[#ec4700]'>Add Recipe</Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default AddRecipe