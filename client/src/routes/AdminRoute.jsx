import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const decoded = jwtDecode(token);

  if (decoded.role !== "admin") {
    return <Navigate to="/employee" />;
  }

  return children;
};

export default AdminRoute;
