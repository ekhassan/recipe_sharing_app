import RecipeDetail from "../components/RecipeDetail"


import { Textarea, Button } from 'flowbite-react'
import Comments from "../components/Comments"

import img from "../assets/images/detail.png"

const DetailPage = () => {

    const tags = ['Italian', 'Meat', "Main Course"]
    const user = {
        "name": "hassan",
        "username": "ek_hassan_07"
    }
    return (
        <>
            <main className="mx-5 sm:mx-48 min-h-screen">

                <RecipeDetail img={img} name={"Simple Delicious Beef Tacos"} tags={tags} user={user} />

                <div>
                    <h2 className="text-2xl font-medium">Comments</h2>
                    <div className="my-10">
                        <Comments img={img} username={"Hello"} time={"12h ago"} text={"I just had some like an hour ago and now I’m craving more. Soooo good. Thank you so much for this recipe. You are a legend!"} />
                    </div>
                </div>
                <div className="mb-20">
                    <h2 className="text-2xl font-medium">Reply</h2>
                    <form>
                        <div>
                            <Textarea id="comment" rows={5} className="resize-none bg-transparent my-4 border-2 focus:ring-[#ec4700] focus:border-[#ec4700] rounded-3xl font-medium text-base" required />
                            <Button className="bg-[#ec4700] hover:bg-[#ec4700] float-end text-white text-base font-medium focus:ring-0" pill color='bg-[#ec4700]'>Post Reply</Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default DetailPage