const { db } = require("../db/connectDB");
const { getDeviceAttendance } = require("../services/zk.service");
const processAttendance = require("../utils/postattendance");

/**
 *  Sync machine logs → daily attendance
 */
exports.syncAttendance = async (req, res) => {
  try {
    const rawLogs = await getDeviceAttendance();
    const processed = processAttendance(rawLogs);

    for (const record of processed) {

      
      const userResult = await db.query(
        "SELECT id, name FROM users WHERE device_user_id = $1",
        [record.device_user_id]
      );

      if (userResult.rows.length === 0) continue;

      const userId = userResult.rows[0].id;

      await db.query(
        `
        INSERT INTO daily_attendance
        (user_id, attendance_date, punch_in, punch_out, status)
        VALUES ($1, $2, $3, $4, 'Present')
        ON CONFLICT (user_id, attendance_date)
        DO UPDATE SET
          punch_in = EXCLUDED.punch_in,
          punch_out = EXCLUDED.punch_out
        `,
        [
          userId,
          record.date,
          record.punch_in,
          record.punch_out
        ]
      );
    }

    res.json({ message: "Attendance synced successfully" });

  } catch (err) {
    console.error("Sync error:", err);
    res.status(500).json({ message: "Sync failed" });
  }
};

/**
 * ADMIN: Today attendance
 */
exports.getTodayAttendance = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        u.name,
        u.device_user_id,
        d.punch_in,
        d.punch_out,
        d.total_hours
      FROM daily_attendance d
      JOIN users u ON u.id = d.user_id
      WHERE d.attendance_date = CURRENT_DATE
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch today attendance" });
  }
};

/**
 * EMPLOYEE: Own attendance only
 */
exports.getMyAttendance = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT
        attendance_date,
        punch_in,
        punch_out,
        total_hours,
        status
      FROM daily_attendance
      WHERE user_id = $1
      ORDER BY attendance_date DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};
