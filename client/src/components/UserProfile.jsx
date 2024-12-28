/* eslint-disable react/prop-types */
import { Card, Button } from "flowbite-react"
import { Link } from "react-router-dom"


const UserProfile = ({ user, posts, followers, followings }) => {
    return (
        <>
            <Card className="rounded-3xl bg-[#fdfaf5]">
                <div className="flex flex-wrap items-start justify-center md:justify-start gap-10 max-w-full">
                    <div className="w-32 h-32">
                        <img src={user?.displayPicture} alt="" className="h-full w-full rounded-full object-cover" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-bold">{user?.name}</h2>
                        <h4 className="text-lg font-medium">{user?.username}</h4>
                        <div className="flex items-center justify-between w-full font-medium gap-5">
                            <span>{posts} Posts</span>
                            <span>{followers} Followers</span>
                            <span>{followings} Following</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            color="bg-[#ec4700]"
                            className="bg-[#ec4700] text-white focus:ring-0"
                            pill>Follow</Button>
                        <Button
                            as={Link}
                            to={'/settings'}
                            color="bg-[#ec4700]"
                            className="bg-[#ec4700] text-white focus:ring-0"
                            pill>Edit Profile</Button>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default UserProfile