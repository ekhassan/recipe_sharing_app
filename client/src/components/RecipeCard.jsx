/* eslint-disable react/prop-types */
import { Card, Rating } from "flowbite-react"
import { Link } from "react-router-dom"


const RecipeCard = ({ _id, title}) => {
    return (
        <>

            <div className="hover:scale-100" >
                <Card className="rounded-3xl overflow-hidden hover:!scale-100 hover:bg-red-400"
                    as={Link}
                    href={`/recipe/${_id}`}
                    imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                    imgSrc=""
                >
                    <h3>{title}</h3>

                    <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                        <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            73 reviews
                        </a>
                    </Rating>
                </Card>
            </div>



        </>
    )
}

export default RecipeCard