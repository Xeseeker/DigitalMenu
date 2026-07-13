import express from "express";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { full_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `
      INSERT INTO admins (full_name, email, password)
      VALUES (?, ?, ?)
      `,
      [full_name, email, hashedPassword],
    );

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
