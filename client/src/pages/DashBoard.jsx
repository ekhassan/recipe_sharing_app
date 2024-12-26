import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useParams } from 'react-router-dom'
import Loading from "../components/Loading"
import { getProfile } from "../api/auth/AuthApi"
import RecipeList from "../components/RecipeList"
import UserProfile from "../components/UserProfile"

const DashBoard = () => {

    const { username } = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['proflile'],
        queryFn: () => getProfile(username),
    })

    const user = data?.user
    const recipes = data?.recipes

    console.log(recipes);


    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        toast.error(error)
    }


    return (
        <>
            <main className="mx-5 sm:mx-32 ">
                <div className="py-24">
                    <UserProfile user={user} />
                    <div className="my-10">
                        <h2 className="text-2xl font-medium">My Recipes</h2>
                        <div className="my-10">
                            <div className="grid grid-cols-1 2xl:grid-cols-4 sm:grid-cols-2 gap-5" >
                                {recipes && recipes.length > 0 ? (
                                    recipes.map((recipe) => (

                                        <RecipeList
                                            key={recipe._id}
                                            id={recipe._id}
                                            title={recipe.title}
                                            img={recipe.image}
                                            notes={recipe.notes}
                                        />

                                    ))
                                ) : (
                                    <h1 className="text-xl text-center">No recipes.</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default DashBoard