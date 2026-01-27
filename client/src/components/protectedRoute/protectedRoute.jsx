import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, authChecked  } = useSelector((state) => state.auth);

  if (authChecked) return <p>Loading...</p>;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;

}; 

export default ProtectedRoute;
