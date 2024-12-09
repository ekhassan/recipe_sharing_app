import { X } from "lucide-react"

const ImageOverlay = ({ imageSrc, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" >
            <button className="absolute top-4 right-4 text-white" onClick={onClose}><X size={32} color="#ec4700" /></button>
            <img src={imageSrc} alt="Full Screen" className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()} />
        </div>
    );
};

export default ImageOverlay;