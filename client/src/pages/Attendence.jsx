import { Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import Table from "../components/Table";
import { EmployContext } from "../context/EmployContextProvider";

/* -------------------- HELPERS -------------------- */
const formatHours = (val) => {
  if (!val) return "00:00";

  // if already formatted string
  if (typeof val === "string") return val;

  // postgres interval object { hours, minutes }
  if (typeof val === "object") {
    const h = String(val.hours || 0).padStart(2, "0");
    const m = String(val.minutes || 0).padStart(2, "0");
    return `${h}:${m}`;
  }

  return "00:00";
};

const Attendence = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role?.toLowerCase()?.trim();
  const isAdmin = role === "admin";

  const { adminAttendance = [], loading } = useContext(EmployContext);

  /* -------------------- TABLE HEADERS -------------------- */
  const adminTableHeader = [
    "Sr.No",
    "Emp ID",
    "Employee Name",
    "Date",
    "Punch In",
    "Punch Out",
    "Status",
    "Expected Hours",
    "Actual Working Hours",
  ];

  const employeeTableHeader = [
    "Emp ID",
    "Employee Name",
    "Date",
    "Status",
    "Punch In",
    "Punch Out",
    "Actual Working Hours",
    "Expected Hours",
  ];

  /* ADMIN TABLE DATA  */
  const adminTableData = useMemo(() => {
    return adminAttendance.map((item, index) => ({
      srNo: index + 1,
      empId: item.device_user_id || item.emp_id,
      name: item.name,
      date: item.attendance_date,
      punchIn: item.punch_in || "--",
      punchOut: item.punch_out || "--",
      status: item.status,
      expectedHours: formatHours(item.expected_hours),
      workingHours: formatHours(item.total_hours),
    }));
  }, [adminAttendance]);

  /*  EMPLOYEE TABLE DATA */
  const employeeTableData = useMemo(() => {
    return adminAttendance.map((item) => ({
      empId: item.device_user_id || item.emp_id,
      name: item.name,
      date: item.attendance_date,
      status: item.status,
      punchIn: item.punch_in || "--",
      punchOut: item.punch_out || "--",
      workingHours: formatHours(item.total_hours),
      expectedHours: formatHours(item.expected_hours),
    }));
  }, [adminAttendance]);

  return (
    <div className="px-3 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
        <Typography className="text-white py-2 text-2xl text-center">
          Attendance
        </Typography>
      </div>

      {/* Table */}
      <div className="mt-4">
        <Table
          loading={loading}
          headers={isAdmin ? adminTableHeader : employeeTableHeader}
          data={isAdmin ? adminTableData : employeeTableData}
        />
      </div>
    </div>
  );
};

export default Attendence;
