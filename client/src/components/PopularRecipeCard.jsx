import { Heart, MessageCircleMore, Zap } from "lucide-react"



// eslint-disable-next-line react/prop-types
const PopularRecipeCard = ({ img, name, tags, likes, comments, tops }) => {

    return (
        <div className="snap-start" >
            <div className=" h-96 w-64 rounded-3xl relative overflow-hidden">
                <img className="w-full h-full object-cover"
                    src={img} alt={""} />
                <div className="absolute p-5 bg-gradient-to-t from-black  h-96 w-64 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
                    <div className="flex flex-col absolute top-7 right-0 gap-1 px-5 text-white">
                        <span className="flex flex-col justify-center items-center">
                            <span> <Heart size={24} color="white" /></span>
                            <p className="font-medium  text-base">{likes}</p>
                        </span>
                        <span className="flex flex-col justify-center items-center">
                            <span><MessageCircleMore size={24} color="white" /></span>
                            <p className="font-medium text-base">{comments}</p>
                        </span>
                        <span className="flex flex-col justify-center items-center">
                            <span> <Zap size={24} color="white" /></span>
                            <p className="font-medium text-base">{tops}</p>
                        </span>
                    </div>
                    <div className="absolute bottom-0 py-5 text-white">
                        <h3 className="text-xl font-medium">{name}</h3>
                        <div className="flex gap-1 mt-3">
                            {/* eslint-disable-next-line react/prop-types */}
                            {tags && tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-slate-400/30 text-xs rounded-full font-medium">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default PopularRecipeCard;