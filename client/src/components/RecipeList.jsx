/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, Dropdown, Button, Modal } from "flowbite-react"
import { EllipsisVertical, Info } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteRecipe } from "../api/recipe/recipeApi"



const RecipeList = ({ id, title, img, notes }) => {

    const [openModal, setOpenModal] = useState(false)

    const mutation = useMutation({
        mutationFn: () => toast.promise(deleteRecipe(id), {
            loading: 'Loading...',
            success: 'Deleted in successfully',
            error: (err) => (err.response?.data?.message || err.message),
        }),
        onSuccess: () => {
            setOpenModal(false)
            window.location.reload();
        }
    })

    const handleDelete = () => {
        mutation.mutate();
    };

    return (
        <>

            <Card className="rounded-3xl bg-[#fdfaf5] relative">
                <Link to={`/detail/${id}`}>
                    <div className="flex items-start w-full gap-4">
                        <div className="flex items-center gap-3 h-32 w-32 rounded-2xl bg-slate-400">
                            <img src={img ? img : "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48-300x300.jpg"} alt={title} className="w-32 h-32 object-cover rounded-2xl" />
                        </div>
                        <div >
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <h4 className="text-lg font-medium">{notes ? notes : "No notes"}</h4>
                        </div>
                    </div>
                </Link>
                <div className="absolute top-5 right-5">
                    <Dropdown className="font-medium rounded-3xl bg-[#fdfaf5]" dismissOnClick={false} renderTrigger={() => <EllipsisVertical />}>
                        <Dropdown.Item as={Link} to={`/edit-recipe/${id}`} className="focus:rounded-t-3xl hover:rounded-t-3xl">Edit</Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/detail/${id}`} >View</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOpenModal(true)} className="focus:rounded-b-3xl hover:rounded-b-3xl text-red-600">Delete</Dropdown.Item>
                    </Dropdown>
                </div>
            </Card>


            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body >
                    <div className="text-center">
                        <Info className="mx-auto mb-4 h-14 w-14 text-[#ec4700]" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this recipe?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button className="font-medium" pill color="failure" onClick={() => handleDelete()} loading={mutation.isLoading}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button className="font-medium hover:!text-[#ec4700]" pill color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default RecipeList