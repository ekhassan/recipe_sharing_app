import PopularRecipeCard from '../components/PopularRecipeCard'


import image from "../assets/images/recipeCard.png"
import cate from "../assets/images/meat.png"

import Category from "../components/Category"
import UnderMin from "../components/UnderMin"

// import { X } from "lucide-react"


const Welcome = () => {


    const tags = ["Italian", "Meat", "Main Course"]

    return (
        <>
            <main className="mx-5 sm:mx-32 min-h-screen">

                <section className="py-10" id="popular_recipe">

                    <h2 className="text-2xl font-medium">Popular Recipes</h2>

                    <div className="my-10 overflow-x-auto">
                        <div className="flex snap-x gap-x-5">
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
                            <PopularRecipeCard img={image} name={'Easy Meatballs with Arugula'} likes={10} comments={20} tops={"25k"} tags={tags} />
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
                        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-10">
                            <UnderMin img={image} name={"Easy Meatballs with Arugula"} />
                            <UnderMin img={image} name={"Testing"} />
                            <UnderMin img={image} name={"Testing"} />
                            <UnderMin img={image} name={"Testing"} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Welcome