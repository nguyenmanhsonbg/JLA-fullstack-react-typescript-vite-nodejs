import { useAuth } from '../../hook/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isOtpVerified } = useAuth();

    if (!isOtpVerified) {
        return <Navigate to="/forgotPassword" />;
    }
    return children;
};

export default ProtectedRoute;
