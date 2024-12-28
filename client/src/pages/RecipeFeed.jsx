import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Masonry from 'react-masonry-css';
import { Search, ChevronsUp } from "lucide-react"; // Ensure ChevronsUp is imported

import { getAllRecipes } from "../api/recipe/recipeApi";
import Loading from "../components/Loading";
import RecipeCard from "../components/RecipeCard";

const RecipeFeed = () => {
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showScrollToTop, setShowScrollToTop] = useState(false);

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
        staleTime: 600000,
        cacheTime: 600000,
    });

    useEffect(() => {
        if (data && data.recipes) {
            setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);

            if (data.recipes.length === 0 || data.recipes.length < 10) {
                setHasMore(false);
            }
        }
    }, [data]);

    console.log(recipes)

    const handleScroll = () => {
        if (!hasMore || isLoading) return;

        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setPage((prevPage) => prevPage + 1);
        }

        // Show or hide scroll to top button based on scroll position
        if (window.scrollY > 300) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading && page === 1) {
        return <Loading />;
    }

    if (isError) {
        toast.error(error.message);
        return null;
    }

    // Filter recipes based on search query
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <main className="mx-5 sm:mx-32">
                <div className="py-24">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-medium" id="top">All Recipes</h2>
                        <div className="flex items-center gap-3">
                            <input
                                placeholder="Search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="font-semibold bg-transparent border border-gray-300 text-sm rounded-3xl block w-full p-2.5 focus:border-[#ec4700] focus:ring-1 focus:ring-[#ec4700] outline-none" />
                            <div>
                                <button
                                    className="bg-[#ec4700] rounded-full p-2"
                                >
                                    <Search className="text-white" size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="my-5 overflow-x-auto">
                        <Masonry breakpointCols={breakpointColumnsObj}
                            className="flex w-auto -ml-4"
                            columnClassName="pl-5 bg-clip-padding"
                        >
                            {filteredRecipes.length > 0 ? (
                                filteredRecipes.map((recipe, index) => (
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


            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-[#ec4700] rounded-full p-2 transition-opacity duration-300 hover:bg-[#d84300]"
                >
                    <ChevronsUp className="text-white" size={24} />
                </button>
            )}
        </>
    );
};

export default RecipeFeed;
