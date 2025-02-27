import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../model/Admin.js";
import argon2 from "argon2";

// Hash a password
async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    throw err;
  }
}

// Verify a password against the stored hash
async function verifyPassword(hash, password) {
  try {
    const match = await argon2.verify(hash, password);
    return match;
  } catch (err) {
    throw err;
  }
}

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin)
      return res.status(400).json({ error: "Admin already exists" });

    // 🔹 Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    //const hashedPassword = await hashPassword(password);

    // 🔹 Save the admin with the hashed password
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(404)
        .json({ error: "Username not found. Please check your credentials." });
    }

    let isMatch = await bcrypt.compare(password, admin.password);

    //let isMatch = await verifyPassword(admin.password, password);
    console.log(isMatch);

    if (!isMatch) {
      return res
        .status(403)
        .json({ error: "Incorrect password. Please try again." });
    }
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access from JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Protects against CSRF
    });

    // res.json({ token });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
