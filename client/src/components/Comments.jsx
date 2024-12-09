

/* eslint-disable react/prop-types */
const Comments = ({ img, username, time, text, }) => {
    return (
        <>
            <div className="border-b-2 w-full">
                <div className="flex items-start gap-5 mb-2">
                    <div className="flex-none w-12 h-12 overflow-hidden rounded-full">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="grow">
                        <div className="text-base text-gray-600">
                            <small>{username} . {time}</small>
                        </div>
                        <div className="text-lg text-gray-800">
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments