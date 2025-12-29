const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { db } = require("../db/connectDB");

const registerController = async (req, res) => {


    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields required" });
        }

        const userExist = await db.query(
            "SELECT id FROM users WHERE email=$1",
            [email]
        );

        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        //   Hashing Pass
        const hashedPassword = await bcrypt.hash(String(password), 10);

        const newUser = await db.query(
            `INSERT INTO users (name,email,password,role)
               VALUES ($1,$2,$3,$4)
               RETURNING id,name,email,role`,
            [name, email, hashedPassword, role]
        );

        res.status(201).json({
            message: "User Registered Successfully",
            user: newUser.rows[0],
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ messag: "Internal Status Error" });
    }

}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;




        if (!email || !password) {
            return res.status(400).json({ message: "All Fields Required" });
        }

        const userExist = await db.query(
            "SELECT id, name, email, password, role FROM users WHERE email=$1",
            [email]
        );

        if (userExist.rows.length === 0) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const user = userExist.rows[0];

        const isMatch = await bcrypt.compare(
            String(password),
            String(user.password)
        );

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

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


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { registerController, loginController };