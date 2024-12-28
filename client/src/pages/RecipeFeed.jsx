import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Masonry from 'react-masonry-css';

import { getAllRecipes } from "../api/recipe/recipeApi";
import Loading from "../components/Loading";
import RecipeCard from "../components/RecipeCard";



const RecipeFeed = () => {
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const breakpointColumnsObj = {
        default: 4,
        2560: 6,
        1400: 5,
        1100: 4,
        700: 3,
        500: 2,
        300: 1
    };

    const queryKey = ['recipes', page];
    const queryFn = () => getAllRecipes({ page });

    const { data, isLoading, isError, error } = useQuery({
        queryKey,
        queryFn,
        keepPreviousData: true,
        staleTime: 10000,
        cacheTime: 600000,
    });

    console.log(recipes)

    useEffect(() => {
        if (data && data.recipes) {
            setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);

            if (data.recipes.length === 0 || data.recipes.length < 10) {
                setHasMore(false);
            }
        }
    }, [data]);

    const handleScroll = () => {
        if (!hasMore || isLoading) return;

        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading]);

    if (isLoading && page === 1) {
        return <Loading />;
    }

    if (isError) {
        toast.error(error.message);
        return null;
    }

    return (
        <main className="mx-5 sm:mx-32">
            <div className="py-24">
                <h2 className="text-2xl font-medium">All Recipes</h2>
                <div className="my-5 overflow-x-auto">
                    <Masonry breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-4"
                        columnClassName="pl-5 bg-clip-padding"
                    >
                        {recipes.length > 0 ? (
                            recipes.map((recipe, index) => (
                                <RecipeCard key={index} {...recipe} />
                            ))
                        ) : (
                            <p>No recipes found.</p>
                        )}
                    </Masonry>
                </div>
                {isLoading && <Loading />}
                {!hasMore && <p className="text-center mt-4">No more recipes to load.</p>}
            </div>
        </main>
    );
};

export default RecipeFeed;
