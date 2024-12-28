import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { getAllRecipes } from "../api/recipe/recipeApi"


import Loading from "../components/Loading"
import PopularRecipeCard from '../components/PopularRecipeCard'

import cate from "../assets/images/meat.png"

import Category from "../components/Category"
import UnderMin from "../components/UnderMin"




const Welcome = () => {

    const { data: recipesData, isLoading: recipeLoading, isError: recipesError, error: recipeError } = useQuery({
        queryKey: ['recipes'],
        queryFn: getAllRecipes,
    })

    const recipes = recipesData?.recipes

    let under30min = [];
    for (let i = 0; i < recipes?.length && under30min?.length < 8; i++) {

        if (recipes[i]?.under30min) {
            under30min.push(recipes[i]);
        }
    }


    if (recipeLoading) return <Loading />
    if (recipesError) {
        toast.error(recipeError)
    }


    return (
        <>
            <main className="mx-5 sm:mx-32 min-h-screen">

                <section className="py-24" id="popular_recipe">

                    <h2 className="text-2xl font-medium">Popular Recipes</h2>

                    <div className="my-10 overflow-x-auto">
                        <div className="flex snap-x gap-x-5">
                            {recipes ? recipes.map(recipe => (
                                <PopularRecipeCard key={recipe._id} id={recipe._id} img={recipe.image} name={recipe.title} likes={10} comments={20} tops={"25k"} tags={recipe.tags} />
                            )) : ""}

                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <h2 className="text-2xl font-medium">Popular Categories</h2>
                    <div className="my-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 md:gap-10">
                            <Category img={cate} category={"Meats"} />
                            <Category img={cate} category={"Vegetarian"} />
                            <Category img={cate} category={"Paleo"} />
                            <Category img={cate} category={"Drinks"} />
                            <Category img={cate} category={"Snacks"} />
                            <Category img={cate} category={"Breakfast"} />
                            <Category img={cate} category={"Creative"} />
                            <Category img={cate} category={"Pizza"} />
                            <Category img={cate} category={"Desserts"} />
                            <Category img={cate} category={"Ice Cream"} />
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <h2 className="text-2xl font-medium">Under 30 Minutes</h2>
                    <div className="my-10">
                        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5 md:gap-10">
                            {under30min ?
                                under30min.map((underMin) =>
                                    <UnderMin key={underMin._id} id={underMin._id} img={underMin.image} name={underMin.title} tags={underMin.tags} />
                                ) :
                                "No Under 30 Minutes Recipes."}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Welcome