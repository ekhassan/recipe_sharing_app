import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipe/recipeApi";
import Loading from "../components/Loading";
import RecipeCard from "../components/RecipeCard";

const RecipeFeed = () => {
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]); // State to hold all recipes
    const [hasMore, setHasMore] = useState(true);

    const queryKey = ['recipes', page]; // Define query key
    const queryFn = () => getAllRecipes({ page }); // Define query function

    const { data, isLoading, isError, error } = useQuery({
        queryKey,
        queryFn,
        keepPreviousData: true,
        staleTime: 5000, // Optional: data remains fresh for 5 seconds
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

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 &&
                hasMore
            ) {
                setPage((prevPage) => prevPage + 1); // Load next page
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    if (isLoading && page === 1) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error fetching recipes: {error.message}</div>;
    }

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-10">
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
                </div>
            </main>
        </>
    );
};

export default RecipeFeed;