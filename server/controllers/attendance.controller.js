const {db} = require("../db/connectDB");
const { getDeviceAttendance } = require("../services/zk.service");

/* Sync machine logs */
exports.syncAttendance = async (req, res) => {
  await getDeviceAttendance();
  res.json({ message: "Machine logs synced" });
};

function toIST(date) {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false
  });
}

function calculateHours(punchIn, punchOut) {
  const start = new Date(punchIn);
  const end = new Date(punchOut);

  const diffMs = end - start; // milliseconds
  if (diffMs <= 0) return "00:00";

  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}



/*  Generate daily attendance */
exports.getTodayAttendance = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        u.id,
        u.name,
        u.device_user_id,

        CASE
          WHEN d.punch_in IS NOT NULL AND d.punch_out IS NOT NULL THEN 'Present'
          WHEN d.punch_in IS NOT NULL AND d.punch_out IS NULL THEN 'Working'
          ELSE 'Absent'
        END AS status,

        d.punch_in,
        d.punch_out,
        COALESCE(d.total_hours, 0) AS total_hours

      FROM users u
      LEFT JOIN daily_attendance d
        ON u.id = d.device_user_id
        AND d.attendance_date = CURRENT_DATE
      WHERE u.role = 'employee'
      ORDER BY u.name;
    `);

    // 📊 Dashboard counts
    const summary = {
      total_employees: result.rows.length,
      present_today: result.rows.filter(
        e => e.status === 'Present' || e.status === 'Working'
      ).length,
      absent_today: result.rows.filter(e => e.status === 'Absent').length
    };

    res.json({
      summary,
      employees: result.rows
    });

  } catch (err) {
    console.error("getTodayAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// /*  Admin – today attendance */ 

exports.generateDailyAttendance = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        u.id,
        u.name,
        u.device_user_id,
        CASE
          WHEN d.punch_in IS NOT NULL AND d.punch_out IS NOT NULL THEN 'Present'
          WHEN d.punch_in IS NOT NULL AND d.punch_out IS NULL THEN 'Working'
          ELSE 'Absent'
        END AS status,
        d.punch_in,
        d.punch_out,
        COALESCE(d.total_hours, 0) AS total_hours
      FROM users u
      LEFT JOIN daily_attendance d
        ON u.id = d.user_id
        AND d.attendance_date = CURRENT_DATE
      WHERE u.role = 'employee'
      ORDER BY u.name;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTodayOrganizationAttendance = async (req, res) => {
  try {
    /* -------------------------------------------------
       🔹 IST DATE (single source of truth)
    --------------------------------------------------*/
    const istDateQuery = `(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE`;

    /* -------------------------------------------------
       1️⃣ UPSERT PRESENT / WORKING EMPLOYEES (ACTIVE ONLY)
    --------------------------------------------------*/
    await db.query(`
      INSERT INTO daily_attendance (
        emp_id,
        attendance_date,
        punch_in,
        punch_out,
        total_hours,
        expected_hours,
        status
      )
      SELECT
        u.id AS emp_id,
        ${istDateQuery} AS attendance_date,

        MIN(al.punch_time) AS punch_in,

        CASE
          WHEN COUNT(al.punch_time) > 1 THEN MAX(al.punch_time)
          ELSE NULL
        END AS punch_out,

        CASE
          WHEN COUNT(al.punch_time) > 1
            THEN MAX(al.punch_time) - MIN(al.punch_time)
          ELSE INTERVAL '0 minutes'
        END AS total_hours,

        INTERVAL '9 hours' AS expected_hours,

        CASE
          WHEN COUNT(al.punch_time) = 1 THEN 'Working'
          ELSE 'Present'
        END AS status

      FROM attendance_logs al
      JOIN users u
        ON u.device_user_id = al.device_user_id

      WHERE (al.punch_time AT TIME ZONE 'Asia/Kolkata')::DATE = ${istDateQuery}
        AND u.role = 'employee'
        AND u.is_active = TRUE

      GROUP BY u.id

      ON CONFLICT (emp_id, attendance_date)
      DO UPDATE SET
        punch_in = EXCLUDED.punch_in,
        punch_out = EXCLUDED.punch_out,
        total_hours = EXCLUDED.total_hours,
        status = EXCLUDED.status;
    `);

    /* -------------------------------------------------
       2️⃣ INSERT ABSENT EMPLOYEES (ACTIVE ONLY)
    --------------------------------------------------*/
    await db.query(`
      INSERT INTO daily_attendance (
        emp_id,
        attendance_date,
        total_hours,
        expected_hours,
        status
      )
      SELECT
        u.id,
        ${istDateQuery},
        INTERVAL '0 minutes',
        INTERVAL '9 hours',
        'Absent'
      FROM users u
      LEFT JOIN attendance_logs al
        ON u.device_user_id = al.device_user_id
       AND (al.punch_time AT TIME ZONE 'Asia/Kolkata')::DATE = ${istDateQuery}

      WHERE al.device_user_id IS NULL
        AND u.role = 'employee'
        AND u.is_active = TRUE

      ON CONFLICT (emp_id, attendance_date)
      DO NOTHING;
    `);

    /* -------------------------------------------------
       3️⃣ FETCH TODAY ATTENDANCE (EMAIL + IS_ACTIVE)
    --------------------------------------------------*/
    const { rows } = await db.query(`
      SELECT
        u.id AS emp_id,
        u.device_user_id,
        u.name,
        u.email,
        u.is_active,

        ${istDateQuery} AS attendance_date,

        a.punch_in,
        a.punch_out,

        COALESCE(a.total_hours, INTERVAL '0 minutes') AS total_hours,
        COALESCE(a.expected_hours, INTERVAL '9 hours') AS expected_hours,

        CASE
          WHEN u.is_active = FALSE THEN 'Inactive'
          WHEN a.status = 'Absent' THEN 'Absent'
          WHEN a.punch_out IS NULL THEN 'Present'
          ELSE 'Present'
        END AS status

      FROM users u
      LEFT JOIN daily_attendance a
        ON a.emp_id = u.id
       AND a.attendance_date = ${istDateQuery}

      WHERE u.role = 'employee'
      ORDER BY u.name;
    `);

    return res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Attendance fetch error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch today's attendance" });
  }
};






// exports.getTodayOrganizationAttendance = async (req, res) => {
//   try {
//     const { rows } = await db.query(`
//       SELECT
//         u.id AS emp_id,
//         u.device_user_id,
//         u.name,

//         -- ✅ Today date strictly in IST
//         (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE AS attendance_date,

//         a.punch_in,
//         a.punch_out,

//         COALESCE(a.total_hours, INTERVAL '0 minutes') AS total_hours,
//         INTERVAL '9 hours' AS expected_hours,

//         CASE
//           WHEN a.emp_id IS NULL THEN 'Absent'
//           WHEN a.punch_in IS NOT NULL AND a.punch_out IS NULL THEN 'Working'
//           ELSE 'Present'
//         END AS status

//       FROM users u
//       LEFT JOIN daily_attendance a
//         ON a.emp_id = u.id
//        AND a.attendance_date =
//            (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE

//       WHERE u.role = 'employee'
//       ORDER BY u.name;
//     `);

//     res.json(rows);
//   } catch (err) {
//     console.error("❌ getTodayOrganizationAttendance:", err);
//     res.status(500).json({ message: "Failed to fetch attendance" });
//   }
// };







// /*  Employee – Today attendance */  

// single Emp Attendance


exports.getMyTodayAttendance = async (req, res) => {
  try {
    const deviceUserId = req.user.device_user_id;

    /* ================= TODAY ATTENDANCE ================= */
    const todayResult = await db.query(
      `
      SELECT
        MIN(punch_time) AS punch_in,
        MAX(punch_time) AS punch_out,
        COUNT(*)::int AS punch_count
      FROM attendance_logs
      WHERE device_user_id = $1
        AND (punch_time AT TIME ZONE 'Asia/Kolkata')::DATE =
            (NOW() AT TIME ZONE 'Asia/Kolkata')::DATE
      `,
      [deviceUserId]
    );

    const today = todayResult.rows[0];

    let todayPunchIn = null;
    let todayPunchOut = null;
    let todayHours = "00:00";
    let todayStatus = "Absent";

    if (today && today.punch_in) {
      todayPunchIn = today.punch_in;

      if (today.punch_count === 1) {
        todayStatus = "Working";
      } else {
        todayPunchOut = today.punch_out;
        todayStatus = "Present";

        const ms = new Date(todayPunchOut) - new Date(todayPunchIn);
        const mins = Math.floor(ms / (1000 * 60));
        todayHours = `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
      }
    }

    /* ================= WEEKLY TOTAL HOURS ================= */
    const weeklyResult = await db.query(
      `
      WITH daily AS (
        SELECT
          (punch_time AT TIME ZONE 'Asia/Kolkata')::DATE AS attendance_date,
          MIN(punch_time) AS punch_in,
          MAX(punch_time) AS punch_out
        FROM attendance_logs
        WHERE device_user_id = $1
          AND (punch_time AT TIME ZONE 'Asia/Kolkata')::DATE >=
              DATE_TRUNC('week', NOW() AT TIME ZONE 'Asia/Kolkata')
        GROUP BY attendance_date
      )
      SELECT
        SUM(EXTRACT(EPOCH FROM (punch_out - punch_in))) AS total_seconds
      FROM daily
      WHERE punch_in IS NOT NULL
        AND punch_out IS NOT NULL
      `,
      [deviceUserId]
    );

    const totalSeconds = Number(weeklyResult.rows[0]?.total_seconds || 0);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const weeklyHours = `${String(Math.floor(totalMinutes / 60)).padStart(2, "0")}:${String(totalMinutes % 60).padStart(2, "0")}`;

    /* ================= RESPONSE ================= */
    res.json({
      today: {
        punch_in: todayPunchIn,   // ISO → frontend formats
        punch_out: todayPunchOut,
        total_hours: todayHours,
        status: todayStatus,
      },
      weekly: {
        total_hours: weeklyHours,
      },
    });

  } catch (err) {
    console.error("❌ getMyTodayAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// /*  Employee – All  attendance */ 
exports.getMyAttendance = async (req, res) => {
  try {
    const deviceUserId = req.user.device_user_id;

    const { rows } = await db.query(
      `
      SELECT
        u.device_user_id,
        u.name AS employee_name,

        -- Attendance date in IST (DATE only)
        (al.punch_time AT TIME ZONE 'Asia/Kolkata')::DATE AS attendance_date,

        COUNT(*) AS punch_count,

        MIN(al.punch_time) AS punch_in,
        MAX(al.punch_time) AS punch_out

      FROM attendance_logs al
      JOIN users u
        ON u.device_user_id = al.device_user_id

      WHERE al.device_user_id = $1

      GROUP BY
        u.device_user_id,
        u.name,
        (al.punch_time AT TIME ZONE 'Asia/Kolkata')::DATE

      ORDER BY attendance_date DESC
      `,
      [deviceUserId]
    );

    // 🔹 Today's date in IST (YYYY-MM-DD)
    const todayIST = new Date()
      .toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

    const formatted = rows.map((row) => {
      const attendanceDate = row.attendance_date
        .toISOString()
        .slice(0, 10);

      const isToday = attendanceDate === todayIST;

      // Only one punch today → still working
      if (isToday && Number(row.punch_count) === 1) {
        return {
          device_user_id: row.device_user_id,
          name: row.employee_name,
          attendance_date: attendanceDate,

          punch_in: row.punch_in,   // ISO → frontend formats
          punch_out: null,

          status: "Working",
          current_working_hours: "00:00",
        };
      }

      // 🔹 Completed day
      const workingHours =
        row.punch_in && row.punch_out
          ? calculateHours(row.punch_in, row.punch_out) // HH:MM
          : "00:00";

      return {
        device_user_id: row.device_user_id,
        name: row.employee_name,
        attendance_date: attendanceDate,

        punch_in: row.punch_in,
        punch_out: row.punch_out,

        status: "Present",
        current_working_hours: workingHours,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(" getMyAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};







