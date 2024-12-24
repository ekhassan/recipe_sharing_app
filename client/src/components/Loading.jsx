import { Loader } from "lucide-react"

const Loading = () => {
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <Loader size={48} className="animate-spin text-[#ec4700] duration-[4s]" />
        </div>

    )
}

export default Loading