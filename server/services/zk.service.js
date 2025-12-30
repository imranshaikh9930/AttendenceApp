const ZKLib = require("zklib-js");
const { db } = require("../db/connectDB");

function normalizePunchTime(recordTime) {
  // Convert to JS Date and strip timezone name
  const date = new Date(recordTime);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid punch time from device");
  }

  return date.toISOString();
}

async function getDeviceAttendance() {
  const zk = new ZKLib("192.168.0.10", 4370, 10000, 4000);

  try {
    await zk.createSocket();
    await zk.enableDevice();

    const logs = await zk.getAttendances();

    if (!logs?.data?.length) return [];

    for (const log of logs.data) {
      const punchTime = normalizePunchTime(log.recordTime);

      await db.query(
        `
        INSERT INTO attendance_logs
        (device_user_id, punch_time, device_ip, device_sn)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
        `,
        [
          String(log.deviceUserId),
          punchTime,
          log.ip || null,
          "EUF7251400009"
        ]
      );
    }

    return logs.data;
  } catch (err) {
    console.error("Sync error:", err);
    throw err;
  } finally {
    await zk.disconnect();
  }
}

module.exports = { getDeviceAttendance };
