const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendance.controller");
const auth = require("../middlewares/authMiddleware");

router.get("/sync", controller.syncAttendance);
router.get("/today", controller.getTodayAttendance);


router.get("/me", auth, controller.getMyAttendance);

module.exports = router;
