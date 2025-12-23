import React from 'react'

const LeavesTable = ({leavesHeader=[],leavesBody=[],adminLeavesHeader=[],adminLeavesBody=[]}) => {

    const role = localStorage.getItem("role");
    // Employee View

    if(role === "admin"){

        return (
          <>
      
              <table className='min-w-max w-full border-collapse text-sm'>
                  <thead className='bg-gray-100'>
                      <tr>
                          {
                              leavesHeader.map((data,index)=>(
                                  <th key={index}  className="border px-4 py-3 font-semibold whitespace-nowrap"> <div className="flex items-center gap-1">
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
                              ))
                          }    
                      </tr>    
                  </thead>  
      
                  <tbody>
                      {
                          leavesBody.map((data,i)=>(
                              <tr key={i}   className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.request}</td>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.period}</td>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.Days}</td>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.Type}</td>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.status}</td>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.Reason}</td>
                                  <td className="border px-4 py-5 whitespace-nowrap text-gray-600 text-[16px]">{data.approvedby}</td>
                              </tr>
                          ))
                      }
                  </tbody>  
              </table>    
          </>
        )
    }

    // Admin Leave Table
    return (

            <>
        
        <table className="min-w-full border-collapse text-sm">
  <thead className="bg-gray-100">
    <tr>
      {adminLeavesHeader.map((data, index) => (
        <th
          key={index}
          className="border px-4 py-3 font-semibold whitespace-nowrap text-left"
        >
          <div className="flex items-center gap-1">
            {data}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              height="0.9em"
              width="0.9em"
              className="text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4-41 17-41h238c21.4 0 32.1-25.9 17-41z" />
            </svg>
          </div>
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {adminLeavesBody.map((data, i) => (
      <tr
        key={data.id || i}
        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
      >
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Employee}
        </td>
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Date}
        </td>
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Period}
        </td>
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Days}
        </td>
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Type}
        </td>
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Reason}
        </td>
        <td className="border px-4 py-3 whitespace-nowrap text-gray-700">
          {data.Contact}
        </td>

        {/* ACTION COLUMN */}
        <td className="border px-4 py-3 whitespace-nowrap">
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded">
              Accept
            </button>
            <button className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded">
              Reject
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    
            </>
          
    )
}

export default LeavesTable