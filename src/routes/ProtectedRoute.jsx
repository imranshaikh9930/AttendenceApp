import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" | "employee"

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }


  console.log("allowedRole",allowedRole);

  console.log("role",role)
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
