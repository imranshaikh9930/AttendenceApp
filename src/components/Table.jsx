import React from 'react'

const Table = ({dummyAttendenceData,tableHeaderData}) => {

      const role = localStorage.getItem("role");
  return (
    <div className="overflow-auto w-full border border-gray-300 rounded-sm max-h-[500px]">
      {
        role != "admin" && 
    <table className="min-w-max w-full border-collapse text-sm">

      <thead className="bg-gray-100">
        <tr>
          {tableHeaderData.map((data, index) => (
            <th
              key={index}
              className="border px-4 py-3 font-semibold whitespace-nowrap"
            >
              <div className="flex items-center gap-1">
                {data}

                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  className="ms-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                </svg>
              </div>
            </th>
          ))}
        </tr>

      </thead>

      

      <tbody>
  {dummyAttendenceData.map((row, i) => (
    <tr
      key={row.id}
      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
    >

<td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.id}
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.EmpId}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.name}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.department}
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.date}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.checkIn}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.checkOut}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        <span
          className={`px-2 py-1 rounded text-sm font-medium
            ${
              row.status === "Present"
                ? "bg-green-100 text-green-700"
                : row.status === "Late"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {row.status}
        </span>
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.workingHours}
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.expectedWHR}
      </td>
    </tr>
  ))}
</tbody>

      

    </table>
      }

      {
        role == "admin" && 
        <table className="min-w-max w-full border-collapse text-sm">

      <thead className="bg-gray-100">
        <tr>
          {tableHeaderData.map((data, index) => (
            <th
              key={index}
              className="border px-4 py-3 font-semibold whitespace-nowrap"
            >
              <div className="flex items-center gap-1">
                {data}

                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  className="ms-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                </svg>
              </div>
            </th>
          ))}
        </tr>

      </thead>

      

      <tbody>
  {dummyAttendenceData.map((row, i) => (
    <tr
      key={row.id}
      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
    >

<td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.empId}
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.empName}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.department}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.date}
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
      <span
          className={`px-2 py-1 rounded text-sm font-medium
            ${
              row.status === "Present"
                ? "bg-green-100 text-green-700"
                : row.status === "Late"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {row.status}
        </span>
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.currentHR}
      </td>

      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.expectedHr}
      </td>

      {/* <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        <span
          className={`px-2 py-1 rounded text-sm font-medium
            ${
              row.status === "Present"
                ? "bg-green-100 text-green-700"
                : row.status === "Late"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {row.status}
        </span>
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.workingHours}
      </td>
      <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">
        {row.expectedWHR}
      </td> */}
    </tr>
  ))}
</tbody>

      

    </table>
      }
  </div>

  )
}

export default Table