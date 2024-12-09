import { Routes, Route } from "react-router-dom"

import Welcome from "./pages/Welcome"
import DetailPage from "./pages/DetailPage"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import AddRecipe from "./pages/AddRecipe"
import EditRecipe from "./pages/EditRecipe"


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>
    </>
  )
}

export default App