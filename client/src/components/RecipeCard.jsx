/* eslint-disable react/prop-types */
import { Card, Rating } from "flowbite-react";
import { Link } from "react-router-dom";
import { calculateAverageRating } from "../utils/util"

const RecipeCard = ({ _id, title, image, ratings }) => {

    const averageRating = calculateAverageRating(ratings);

    return (
        <div>
            <Link to={`/detail/${_id}`} >
                <Card className="rounded-3xl bg-[#fdfaf5] overflow-hidden mb-4"
                    imgAlt="Recipe Image"
                    imgSrc={image ? image : "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48-300x300.jpg"}
                >
                    <h3 className="text-lg font-medium">{title}</h3>

                    <Rating>
                        <Rating.Star filled={averageRating === 0 ? false : true} />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{averageRating.toFixed(2)}</p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />

                        <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            {ratings.length} ratings
                        </span>
                    </Rating>
                </Card>
            </Link>
        </div>
    );
};

export default RecipeCard;
