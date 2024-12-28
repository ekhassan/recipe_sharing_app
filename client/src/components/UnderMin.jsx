import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const UnderMin = ({ id, img, name, tags }) => {
    return (
        <Link to={`/detail/${id}`} >
            <div className="flex justify-center relative">
                <div className="w-64 md:w-72 h-96  rounded-3xl overflow-hidden flex flex-col justify-between relative group">
                    <img src={img} alt={name} className="h-full w-full object-cover" />
                    <h3 className="font-semibold text-lg bg-gradient-to-t from-black backdrop-blur-sm text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                        {name}
                        <div className="flex gap-1 mt-3 absolute bottom-5 left-5">
                            {/* eslint-disable-next-line react/prop-types */}
                            {tags && tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-slate-400/30 text-xs rounded-full font-medium">{tag}</span>
                            ))}
                        </div>
                    </h3>

                </div>
            </div>
        </Link>
    );
}

export default UnderMin;