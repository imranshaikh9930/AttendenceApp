import React from "react";

const SortIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 320 512"
    height="1em"
    width="1em"
    className="ms-1 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z" />
  </svg>
);

const StatusBadge = ({ status }) => {
  const styles =
    status === "Present"
      ? "bg-green-600 text-white"
      : status === "Late"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${styles}`}>
      {status}
    </span>
  );
};

const Table = ({ data = [], headers = [], role = "employee" }) => {
  return (
    <div className="overflow-auto w-full border border-gray-300 rounded-sm max-h-[500px]">
      <table className="min-w-max w-full border-collapse text-sm">
        {/* HEADER */}
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="border px-4 py-3 font-semibold whitespace-nowrap">
                <div className="flex items-center gap-1">
                  {h}
                  <SortIcon />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
            >
              {role === "admin" ? (
                <>
                  <td className="border px-4 py-4">{row.id}</td>
                  <td className="border px-4 py-4">{row.EmpId}</td>
                  <td className="border px-4 py-4">{row.name}</td>
                  <td className="border px-4 py-4">{row.date}</td>
                  <td className="border px-4 py-4">{row.checkIn}</td>
                  <td className="border px-4 py-4">{row.checkOut}</td>
                  <td className="border px-4 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="border px-4 py-4">{row.expectedWHR}</td>
                  <td className="border px-4 py-4">{row.workingHours}</td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-4">{row.empId}</td>
                  <td className="border px-4 py-4">{row.empName}</td>
                  <td className="border px-4 py-4">{row.date}</td>
                  <td className="border px-4 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="border px-4 py-4">{row.currentHR}</td>
                  <td className="border px-4 py-4">{row.expectedHr}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
