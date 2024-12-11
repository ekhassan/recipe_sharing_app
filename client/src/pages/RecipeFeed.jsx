import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipe/recipeApi";
import Loading from "../components/Loading";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-hot-toast";
import { Button } from "flowbite-react"

const RecipeFeed = () => {
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const queryKey = ['recipes', page];
    const queryFn = () => getAllRecipes({ page });

    const { data, isLoading, isError, error } = useQuery({
        queryKey,
        queryFn,
        keepPreviousData: true,
        staleTime: 5000,
    });

    // Update recipes when new data is fetched
    useEffect(() => {
        if (data && data.recipes) {
            setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);
            if (data.recipes.length < 10) {
                setHasMore(false); // No more recipes to load
            }
        }
    }, [data]);

    const loadMoreRecipes = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading && page === 1) {
        return <Loading />;
    }

    if (isError) {
        toast.error(error.message);
    }

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-24">
                    <h2 className="text-2xl font-medium">All Recipes</h2>
                    <div className="my-5 overflow-x-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 py-5 transition-all ease-in-out duration-500">
                            {recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <RecipeCard key={recipe._id} {...recipe} />
                                ))
                            ) : (
                                <p>No recipes found.</p>
                            )}
                        </div>
                    </div>
                    {hasMore && (
                        <div className="flex justify-center">
                            <Button
                                onClick={loadMoreRecipes}
                                className="bg-[#ec4700] text-white focus:ring-0"
                                color="bg-[#ec4700]"
                                pill
                            >
                                Load More
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default RecipeFeed;
