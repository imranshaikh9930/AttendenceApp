import React from "react";

const Leavecards = ({ LeavecardData = [] }) => {
  const role = localStorage.getItem("role");

  if (role !== "admin") return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {LeavecardData.map((data) => (
        <div
          key={data.id}
          className="w-full min-h-[120px] rounded-xl bg-white border
            border-gray-200 p-5 shadow-sm flex flex-col justify-between
            transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg text-white text-2xl"
              style={{ backgroundColor: data.bgColor }}
            >
              {data.icon}
            </div>

            <div>
              <p className="text-sm text-gray-500">{data.title}</p>
              <p className="text-xl font-semibold">{data.value}</p>
            </div>
          </div>

          {data.description && (
            <p className="text-xs text-gray-400 mt-2">
              {data.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Leavecards;
