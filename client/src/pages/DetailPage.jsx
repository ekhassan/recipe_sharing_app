import RecipeDetail from "../components/RecipeDetail"
import { Textarea, Button } from 'flowbite-react'
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import { getRecipe } from "../api/recipe/recipeApi"
import { getProfile } from "../api/auth/AuthApi"

import Loading from "../components/Loading"
import Comments from "../components/Comments"
import img from "../assets/images/detail.png"


const DetailPage = () => {

    const { id } = useParams();
    // Getting Recipe
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipe(id),
        enabled: !!id,
    })

    const recipe = data?.recipe
    console.log(recipe);


    // Getting Owner Id
    const { data: userData, error: userError } = useQuery({
        queryKey: ['user', recipe?.userId],
        queryFn: () => getProfile(recipe?.userId),
        enabled: !!recipe?.userId
    })

    const user = userData?.user
    console.log(user);


    if (isLoading) {
        return <Loading />
    }

    if (isError || userError) {
        toast.error(error.message)
    }

    return (
        <>
            <main className="mx-5 sm:mx-48 min-h-screen">

                <div className="py-24">
                    <RecipeDetail
                        img={recipe?.imageUrl}
                        name={recipe?.title}
                        tags={recipe?.tags}
                        user={user}
                        notes={recipe?.notes || ""}
                        details={recipe?.details || ""}
                        ingredients={recipe?.ingredients || ""}
                        directions={recipe?.directions || ""} />

                    <div>
                        <h2 className="text-2xl font-medium">Comments</h2>
                        <div className="my-10">
                            <Comments img={img} username={"Hello"} time={"12h ago"} text={"I just had some like an hour ago and now I’m craving more. Soooo good. Thank you so much for this recipe. You are a legend!"} />
                        </div>
                    </div>
                    <div className="mb-20">
                        <h2 className="text-2xl font-medium">Reply</h2>
                        <form>
                            <div>
                                <Textarea id="comment" rows={5} className="resize-none bg-transparent my-4 border-2 focus:ring-[#ec4700] focus:border-[#ec4700] rounded-3xl font-medium text-base" required />
                                <Button className="bg-[#ec4700] hover:bg-[#ec4700] float-end text-white text-base font-medium focus:ring-0" pill color='bg-[#ec4700]'>Post Reply</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default DetailPage