const cron = require("node-cron");
const { getDeviceAttendance } = require("../services/zk.service");
const { generateDailyAttendance, syncAttendance } = require("../controllers/attendance.controller");

cron.schedule(
    "* * * * *",
    async () => {
      console.log("Midnight job running");
      await getDeviceAttendance();
    //   await generateDailyAttendance();
      await syncAttendance()
    },
    {
      timezone: "Asia/Kolkata"
    }
  );
  