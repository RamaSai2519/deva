import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const prev_user = localStorage.getItem('prev_user') === 'true';
    const reroute = prev_user ? '/login' : '/signup';
    return isAuthenticated ? children : <Navigate to={reroute} replace />;
};

export default ProtectedRoute;
