import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const EmployContext = createContext();

const EmployProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [employeeAttendance, setEmployeeAttendance] = useState([]);
  const [singleAttendance, setSingleAttendance] = useState(null);
  const [adminAttendance, setAdminAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role?.toLowerCase();

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

// Overview Of Single Employee
  const fetchSingleAttendance = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/employee/attendance/today",
        axiosConfig
      );

      setSingleAttendance(res.data || null);
    } catch (error) {
      console.error("Single attendance fetch error:", error);
      setSingleAttendance(null);
    } finally {
      setLoading(false);
    }
  };
  /* employee previous attendance */
  const fetchEmployeeAttendance = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/employee/attendance/history",
        axiosConfig
      );

      if (Array.isArray(res.data)) {
        setEmployeeAttendance(res.data);

        // Store employee basic info
        if (res.data.length > 0) {
          setEmployee({
            emp_id: res.data[0].emp_id,
            device_user_id: res.data[0].device_user_id,
            name: res.data[0].name,
          });
        }
      } else {
        setEmployeeAttendance([]);
      }
    } catch (error) {
      console.error("Employee attendance fetch error:", error);
      setEmployeeAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  /*  admin attendance -(All Emp) */
  const fetchAdminAttendance = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/admin/attendance/today",
        axiosConfig
      );

      console.log(res);
      if (Array.isArray(res.data)) {
        setAdminAttendance(res.data);
      } else {
        setAdminAttendance([]);
      }
    } catch (error) {
      console.error("Admin attendance fetch error:", error);
      setAdminAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  /*  INITIAL LOAD  */
  useEffect(() => {
    if (!token || !role) return;

    if (role === "admin") {
      fetchAdminAttendance();
    } else {
      fetchEmployeeAttendance();
      fetchSingleAttendance(); 
    }
  }, [token, role]);

  
  return (
    <EmployContext.Provider
      value={{
        employee,
        employeeAttendance,
        adminAttendance,
        loading,
        singleAttendance,
        refreshEmployeeAttendance: fetchEmployeeAttendance,
        refreshAdminAttendance: fetchAdminAttendance,
      }}
    >
      {children}
    </EmployContext.Provider>
  );
};

export default EmployProvider;
