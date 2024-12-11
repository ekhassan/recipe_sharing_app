/* eslint-disable react/prop-types */
import { Card, Rating } from "flowbite-react";
import { Link } from "react-router-dom";

const RecipeCard = ({ _id, title, imageUrl }) => {
    return (
        <div>
            <Link to={`/detail/${_id}`} >
                <Card className="rounded-3xl bg-[#fdfaf5] overflow-hidden "
                    imgAlt="Recipe Image"
                    imgSrc={imageUrl}
                >
                    <h3>{title}</h3>

                    <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />

                        <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            73 reviews
                        </span>
                    </Rating>
                </Card>
            </Link>
        </div>
    );
};

export default RecipeCard;
