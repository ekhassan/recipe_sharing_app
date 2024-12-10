import { Loader } from "lucide-react"

const Loading = () => {
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <Loader size={56} className="animate-spin text-[#ec4700]" />
        </div>

    )
}

export default Loading