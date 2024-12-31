import useAuthStore from "../store/useAuthStore"

const AuthenticatedRoute = ({ element }) => {

    const { token } = useAuthStore();

    if (token) {
        window.history.back();
    }

    return element;
}

export default AuthenticatedRoute