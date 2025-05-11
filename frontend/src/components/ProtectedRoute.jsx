import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

function ProtectedRoute({children}) {

    const {pathname} = useLocation();

    const {isAuthenticated} = useSelector((state) => state.auth);

    if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
        return <Navigate to="/home"/>;
    }

    if (!isAuthenticated) {
        if (pathname === '/home' ||
            pathname === '/orders' ||
            pathname.startsWith("/profile")) {
            return <Navigate to="/login"/>;
        }
    }

    return children;
}

export default ProtectedRoute;