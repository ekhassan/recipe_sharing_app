import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";


const ProtectedRoute = ({ element }) => {
    const location = useLocation();

    const { token } = useAuthStore();

    if (!token) {
        window.history.back();
    }

    return token ? element : <Navigate to="/signin" replace state={{ from: location }} />;
};

export default ProtectedRoute;