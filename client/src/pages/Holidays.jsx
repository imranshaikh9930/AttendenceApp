import { Typography } from '@mui/material'
import React from 'react'
import YearCalendar from '../components/YearCalender'
import { CalendarRange } from 'lucide-react';
import Calendar from '../components/Calender';
import HolidayCalendar from '../components/HolidayCalender';

const Holidays = () => {
    const holidays = [
        "2026-01-26",
        "2026-03-08",
        "2026-08-15",
      ];
      
      const attendanceData = {
        "2026-01-10": "present",
        "2026-01-11": "absent",
        "2026-01-12": "leave",
        "2026-03-08": "holiday",
      };
      
      
      const employeesOnDay = {
        "2026-01-10": 5,
        "2026-01-11": 2,
      };

      
      const timelineData = [
        // 🔹 JANUARY 2026
        {
          date: "2026-01-01",
          day: "Thursday",
          holiday: true,
          holidayName: "New Year’s Day",
          events: [
            { time: "All Day", title: "New Year’s Day", type: "holiday" },
          ],
        },
        {
          date: "2026-01-14",
          day: "Wednesday",
          holiday: true,
          holidayName: "Makar Sankranti / Pongal",
          events: [
            { time: "All Day", title: "Makar Sankranti / Pongal", type: "holiday" },
          ],
        },
        {
          date: "2026-01-26",
          day: "Monday",
          holiday: true,
          holidayName: "Republic Day",
          events: [
            { time: "All Day", title: "Republic Day", type: "holiday" },
          ],
        },
      
        // 🔹 FEBRUARY 2026
        {
          date: "2026-02-15",
          day: "Sunday",
          holiday: true,
          holidayName: "Maha Shivaratri",
          events: [
            { time: "All Day", title: "Maha Shivaratri", type: "holiday" },
          ],
        },
      
        // 🔹 MARCH 2026
        {
          date: "2026-03-04",
          day: "Wednesday",
          holiday: true,
          holidayName: "Holi",
          events: [
            { time: "All Day", title: "Holi Festival", type: "holiday" },
          ],
        },
        {
          date: "2026-03-21",
          day: "Saturday",
          holiday: true,
          holidayName: "Id-ul-Fitr (Tentative)",
          events: [
            { time: "All Day", title: "Id-ul-Fitr", type: "holiday" },
          ],
        },
      
        // 🔹 APRIL 2026
        {
          date: "2026-04-03",
          day: "Friday",
          holiday: true,
          holidayName: "Good Friday",
          events: [
            { time: "All Day", title: "Good Friday", type: "holiday" },
          ],
        },
      
        // 🔹 MAY 2026
        {
          date: "2026-05-01",
          day: "Friday",
          holiday: true,
          holidayName: "Buddha Purnima / Labour Day",
          events: [
            { time: "All Day", title: "Buddha Purnima", type: "holiday" },
          ],
        },
        {
          date: "2026-05-27",
          day: "Wednesday",
          holiday: true,
          holidayName: "Id-ul-Zuha (Bakrid) (Tentative)",
          events: [
            { time: "All Day", title: "Bakrid", type: "holiday" },
          ],
        },
      
        // 🔹 JUNE 2026
        {
          date: "2026-06-26",
          day: "Friday",
          holiday: true,
          holidayName: "Muharram (Tentative)",
          events: [
            { time: "All Day", title: "Muharram", type: "holiday" },
          ],
        },
      ];
      
  return (
     <div className="px-3 pb-6">
    
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
          <Typography className="text-white py-2 text-2xl text-center">
           Holidays
          </Typography>

        </div>
          {/* <YearCalendar 
           year = {new Date().getFullYear()}
            holidays={holidays}
            attendanceData={attendanceData}
            employeesOnDay={employeesOnDay}
          /> */}

              <h1 className='place-self-start bg-[#222f7d] mt-4 text-white rounded-lg px-3 py-2 text-xl '>Total Holidays :- {timelineData.length}</h1>
            <div className='w-full flex items-center justify-center'>
          <HolidayCalendar  data={timelineData}/>
            </div>
    
    
       
      
      </div>
  )
}

export default Holidays