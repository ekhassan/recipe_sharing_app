import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <main className="flex items-center justify-center h-screen">
                <div className="py-24 text-center space-y-5">
                    <h1 className="text-8xl">Not Found</h1>
                    <p className="text-xl">The page you are looking for does not exist. Back to <Link to={"/"} className="text-[#ec4700] underline hover:no-underline" >Home</Link></p>
                </div>
            </main>
        </>
    )
}

export default NotFound