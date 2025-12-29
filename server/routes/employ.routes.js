const express = require("express");
const auth = require("../middlewares/authMiddleware");


const router = express.Router();

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