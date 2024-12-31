import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ element }) => {

    const { token } = useAuthStore();


    if (!token) {
        return <Navigate to="/signin" />;
    }

    return element;
};

export default ProtectedRoute;
