// middleware/auth.js

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.headers.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default auth;
