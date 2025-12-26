import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Adminlayout from "./layout/Adminlayout";
import Employlayout from "./layout/EmployLayout";

import Overview from "./pages/Overview";
import ChangePassword from "./pages/ChangePassword";
import Attendence from "./pages/Attendence";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./components/Login";
import Holidays from "./pages/Holidays";
import Profile from "./pages/Profile";
import Employelist from "./components/Employelist";
import Employleaves from "./pages/Employleaves";
import Adminleaves from "./pages/Adminleaves";

import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./components/Register";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        {/* ADMIN PROTECTED */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<Overview />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="attendance" element={<Attendence />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            <Route path="employees" element={<Employelist />} />
            <Route path="leaves" element={<Adminleaves />} />
          </Route>
        </Route>

        {/* EMPLOYEE PROTECTED */}
        <Route element={<ProtectedRoute allowedRole="employee" />}>
          <Route path="/employee" element={<Employlayout />}>
            <Route index element={<Overview />} />
            <Route path="attendance" element={<Attendence />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="leaves" element={<Employleaves />} />
          </Route>
        </Route>

        {/* Not Found */}

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
