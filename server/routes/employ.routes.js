const express = require("express");
const auth = require("../middlewares/authMiddleware");


const router = express.Router();

function formatAttendance(rawLogs, employeeMap) {
    const grouped = {};
  
    // 1️⃣ Group logs by deviceUserId
    rawLogs.forEach(log => {
      const empId = log.deviceUserId;
      const time = new Date(log.recordTime);
  
      if (!grouped[empId]) {
        grouped[empId] = [];
      }
  
      grouped[empId].push(time);
    });
  
    // 2️⃣ Build UI response
    const result = [];
  
    Object.keys(grouped).forEach(empId => {
      const times = grouped[empId].sort((a, b) => a - b);
  
      result.push({
        name: employeeMap[empId] || "Unknown",
        device_user_id: empId,
        punch_in: times[0].toISOString(),
        punch_out: times[times.length - 1].toISOString()
      });
    });
  
    return result;
  }
  

// Employ Punch In  &  Punch Out

router.get("/",auth,async(req,res)=>{
    try {
        
        return res.json({message:"Welcome to employee Route Protected"});

    } catch (error) {
        res.status(500).json({messag:"Internal Server Error"});
    }
})

// Employ Own attendence view



module.exports = router;