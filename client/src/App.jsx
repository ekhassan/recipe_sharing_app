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
import ProtectedRoute from "./Routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Welcome /> },
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/recipe', element: <ProtectedRoute element={<RecipeFeed />} /> },
      { path: '/detail/:id', element: <ProtectedRoute element={<DetailPage />} /> },
      { path: '/add-recipe', element: <ProtectedRoute element={<AddRecipe />} /> },
      { path: '/edit-recipe/:id', element: <ProtectedRoute element={<EditRecipe />} /> },
      { path: '/:username', element: <DashBoard /> }, // Public route
      { path: '/*', element: <NotFound /> },
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;