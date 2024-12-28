/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ImageOverlay from './ImageOverlay';

const TextInput = ({ type, label, name, placeholder, value, onChange, onBlur }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const openOverlay = () => {
        setIsOverlayVisible(true);
    };

    const closeOverlay = () => {
        setIsOverlayVisible(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
            onChange(e); // Call the onChange prop to update Formik state
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="mb-6">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <div className="relative">
                {type === 'file' ? (
                    <>
                        {imageSrc && (
                            <div className="my-6 flex items-center justify-center">
                                <img
                                    src={imageSrc || value}
                                    alt="Uploaded preview"
                                    className="w-28 h-28 object-cover rounded-full cursor-pointer"
                                    onClick={openOverlay}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            name={name}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="bg-transparent border border-gray-300 text-sm rounded-3xl block w-full focus:border-[#ec4700] focus:ring-1 focus:ring-[#ec4700] outline-none"
                        />
                    </>
                ) : (
                    <>
                        <input
                            type={isPasswordVisible ? 'text' : type}
                            name={name}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            className="bg-transparent border border-gray-300 text-sm rounded-3xl block w-full p-2.5 focus:border-[#ec4700] focus:ring-1 focus:ring-[#ec4700] outline-none"
                        />
                        {type === 'password' && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center justify-center"
                                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                            >
                                {isPasswordVisible ? <EyeOff size={20} color="#ec4700" /> : <Eye size={20} />}
                            </button>
                        )}
                    </>
                )}
            </div>
            {isOverlayVisible && imageSrc && <ImageOverlay imageSrc={imageSrc} onClose={closeOverlay} />}
        </div>
    );
};

export default TextInput;