const Database = require("../database/configuration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existQuery = "SELECT * FROM users WHERE email = ?";

        Database.query(existQuery, [email], async (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }

            if (data.length > 0) {
                return res
                    .status(400)
                    .json({ message: "User already exists, try with another email" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            Database.query(
                insertQuery,
                [name, email, hashedPassword],
                (err, data) => {
                    if (err) {
                        return res.status(500).json({ message: "Internal server error" });
                    }

                    return res.status(200).json({
                        message: "Registered successfully",
                        status: "success",
                        data,
                    });
                }
            );
        });
    } catch (error) {
        return res.status(400).json({ message: "Error found" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Both fields are required" });
        }

        const checkQuery = "SELECT * FROM users WHERE email = ?";

        Database.query(checkQuery, [email], async (err, data) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (data.length === 0) {
                return res
                    .status(400)
                    .json({ message: "User not found with this email" });
            }

            const user = data[0];

            const PasswordCheck = await bcrypt.compare(password, user.password);
            if (!PasswordCheck) {
                return res.status(400).json({ message: "Password mismatched" });
            }

            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                "secretKey",
                { expiresIn: "100d" }
            );

            return res.status(200).json({
                message: "Logged in successfully",
                status: "success",
                data: user,
                token,
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred" });
    }
};

module.exports = { register, login };
