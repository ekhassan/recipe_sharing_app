import RecipeDetail from "../components/RecipeDetail"
import { Textarea, Button } from 'flowbite-react'
import { useQuery, useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import { getRecipe } from "../api/recipe/recipeApi"
import { getComments, postComment } from "../api/comments/commentApi"
import { timeAgo } from "../utils/util"

import Loading from "../components/Loading"
import Comments from "../components/Comments"
import { useFormik } from "formik"



const DetailPage = () => {

    const { id } = useParams();

    // Getting Recipe
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipe(id),
        enabled: !!id,
    })

    const recipe = data?.recipe

    const { data: commentsData, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => getComments(id),
        enabled: !!id
    })

    const comments = commentsData?.formattedComments;

    // Post Comment
    const mutaiton = useMutation({
        mutationFn: (content) => toast.promise(postComment(id, content), {
            loading: "Loading...",
            success: "Comment posted successfully",
            error: (err) => (err.response?.data?.message || err.message)
        }),
        onSuccess: () => {
            formik.resetForm()
        }
    });

    const formik = useFormik({
        initialValues: {
            content: ""
        },
        onSubmit: async (values) => {
            mutaiton.mutate(values)
        }
    })

    // console.log(formik.values)
    // console.log(mutaiton)


    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        toast.error(error.message)
    }

    return (
        <>
            <main className="mx-5 sm:mx-48 min-h-screen">
                <div className="py-24">
                    <RecipeDetail
                        img={recipe?.imageUrl}
                        name={recipe?.title}
                        tags={recipe?.tags}
                        user={recipe.userId}
                        notes={recipe?.notes || ""}
                        details={recipe?.details || ""}
                        ingredients={recipe?.ingredients || ""}
                        directions={recipe?.directions || ""} />

                    <div>
                        <h2 className="text-2xl font-medium">Comments</h2>
                        <div className="my-10">

                            {comments && comments.length > 0 ? (
                                comments.map((comment, index) => (
                                    <Comments
                                        key={index}
                                        img={comment.user.displayPicture}
                                        username={comment.user.username}
                                        time={timeAgo(comment.createdAt)}
                                        text={comment.content}
                                    />
                                ))
                            ) : (
                                commentsLoading ? <div className="relative py-5"><Loading /></div> : <p>No comments yet</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-20">
                        <h2 className="text-2xl font-medium">Reply</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <Textarea id="comment" rows={5} className="resize-none bg-transparent my-4 border-2 focus:ring-[#ec4700] focus:border-[#ec4700] rounded-3xl font-medium text-base"
                                    placeholder="Write a comment..." value={formik.values.content} onChange={formik.handleChange} name="content"
                                    required />
                                <Button className="bg-[#ec4700] hover:bg-[#ec4700] float-end text-white text-base font-medium focus:ring-0" type="submit" disabled={mutaiton.isLoading} pill color='bg-[#ec4700]'>Post Reply</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default DetailPage