const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { db } = require("../db/connectDB");

const registerController = async (req, res) => {
    try {
      let { name, email, password, role } = req.body;
        
      role = role?.toLowerCase().trim();

    //   // map employee → admin
    //   if (role === "employee" || role === "employe") {
    //     role = "admin";
    //   }
    
      //Validation
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      //  Normalize inputs
      name = name.trim();
      email = email.trim().toLowerCase();
      password = String(password).trim();
      role = role.trim();
  
      //Check existing user
      const userExist = await db.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );
  
      if (userExist.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // 🔐 Hash password (ONLY ONCE)
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 🧪 Debug (remove later)
      console.log("Plain Password:", password);
      console.log("Hashed Password:", hashedPassword);
  
      // 💾 Insert user
      const newUser = await db.query(
        `INSERT INTO users (name, email, password, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role`,
        [name, email, hashedPassword, role]
      );
  
      res.status(201).json({
        message: "User Registered Successfully",
        user: newUser.rows[0],
      });
  
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


const loginController = async (req, res) => {
    try {
      let { email, password } = req.body;
  
      // 🔒 Basic validation
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // 🧼 Normalize inputs
      email = email.trim().toLowerCase();
      password = String(password).trim();
  
      const userExist = await db.query(
        "SELECT id, name, email, password, role FROM users WHERE email=$1",
        [email]
      );
  
      if (userExist.rows.length === 0) {
        return res.status(400).json({ message: "Invalid Email or Password" });
      }
  
      const user = userExist.rows[0];
  
      // 🧪 Debug (remove in production)
      console.log("Entered Password:", password);
      console.log("Stored Hash:", user.password);
  
      // ✅ bcrypt comparison
      const isMatch = await bcrypt.compare(password, user.password);
  
      console.log("Password Match:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Email or Password" });
      }
  
      // 🔐 JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Login Successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = { registerController, loginController };