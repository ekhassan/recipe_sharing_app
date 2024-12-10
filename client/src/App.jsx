import { Routes, Route } from "react-router-dom"

import Welcome from "./pages/Welcome"
import DetailPage from "./pages/DetailPage"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import AddRecipe from "./pages/AddRecipe"
import EditRecipe from "./pages/EditRecipe"
import RecipeFeed from "./pages/RecipeFeed"
import NotFound from "./pages/NotFound"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe" element={<RecipeFeed />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App