import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useLocation } from "react-router-dom"

const ProtectedRoute = ({ element }) => {
    const location = useLocation();
    const { token } = useAuthStore();

    return token ? element : <Navigate to="/signin" replace state={{ from: location }} />;
};

export default ProtectedRoute;