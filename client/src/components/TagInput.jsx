import { useState, useEffect } from 'react';

const TagInput = ({ name, value, onChange, onBlur }) => {
    const [tags, setTags] = useState(value || []);
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        const newTags = inputValue.trim().split(',').filter(tag => tag !== '');
        setTags([...tags, ...newTags]);
        setInputValue('');
        onChange(name, [...tags, ...newTags]); 
    };

    const handleRemoveTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        onChange(name, newTags); 
    };

    const handleKeyPress = (e) => {
        if (e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
        }
    };

   
    useEffect(() => {
        if (value && value !== tags) {
            setTags(value);
        }
    }, [value, tags]);

    return (
        <div className="mb-6">

            <div className="relative flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="ml-2 text-gray-500 hover:text-gray-900"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <input
                    name={name}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onKeyDown={handleKeyDown}
                    onBlur={onBlur}
                    placeholder="Add tag (separate with commas)"
                    className="bg-transparent border border-gray-300 text-sm rounded-3xl block w-full p-2.5 focus:border-[#ec4700] focus:ring-1 focus:ring-[#ec4700] outline-none"
                />
            </div>
        </div>
    );
};

export default TagInput;
