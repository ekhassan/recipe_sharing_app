import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./pages/Welcome";
import DetailPage from "./pages/DetailPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeFeed from "./pages/RecipeFeed";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";
import Layout from "./layouts/Layout";
import Setting from "./pages/Setting";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Auth from "./Routes/AuthenticatedRoute"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Welcome /> },
      { path: '/signin', element: <Auth element={<Signin />} /> },
      { path: '/signup', element: <Auth element={<Signup />} /> },
      { path: '/recipe', element: <RecipeFeed /> },
      { path: '/detail/:id', element: <DetailPage /> },
      { path: '/add-recipe', element: <ProtectedRoute element={<AddRecipe />} /> },
      { path: '/edit-recipe/:id', element: <ProtectedRoute element={<EditRecipe />} /> },
      { path: '/u/:username', element: <DashBoard /> },
      { path: "/settings", element: <ProtectedRoute element={<Setting />} /> },
      { path: '*', element: <NotFound /> },
    ]
  }
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;