import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const UnderMin = ({ img, name }) => {
    return (
        <Link to={`/recipe`} >
            <div className="flex justify-center">
                <div className="w-64 md:w-72 h-96 rounded-3xl overflow-hidden flex flex-col justify-between relative group">
                    <img src={img} alt={name} className="h-full w-full object-cover" />
                    <h3 className="font-semibold text-lg bg-black/40 backdrop-blur-sm text-center absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                        {name}
                    </h3>
                </div>
            </div>
        </Link>
    );
}

export default UnderMin;