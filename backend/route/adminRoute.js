import express from "express";
import auth from "../middleware/auth.js";
import {
  addCategory,
  getCategoriesAdmin,
  updateCategory,
  deleteCategory,
  addMenuItem,
  getAllMenuItems,
  getAllComments,
  deleteComment,
  getAllRatings,
  generateQRCode,
  downloadQRCode,
  getSingleItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controller/adminController.js";

const adminRouter = express.Router();

// Categories
adminRouter.post("/categories", auth, addCategory);
adminRouter.get("/categories", auth, getCategoriesAdmin);
adminRouter.put("/categories/:categoryId", auth, updateCategory);
adminRouter.delete("/categories/:categoryId", auth, deleteCategory);

// Menu Items
adminRouter.post("/items", auth, addMenuItem);
adminRouter.get("/items", auth, getAllMenuItems);
adminRouter.get("/items/:itemId", auth, getSingleItem);
adminRouter.put("/items/:itemId", auth, updateMenuItem);
adminRouter.delete("/items/:itemId", auth, deleteMenuItem);

// Comments
adminRouter.get("/comments", auth, getAllComments);
adminRouter.delete("/comments/:commentId", auth, deleteComment);

// Ratings
adminRouter.get("/ratings", auth, getAllRatings);

// QR Code
adminRouter.post("/qr/generate", auth, generateQRCode);
adminRouter.get("/qr/download", auth, downloadQRCode);

export default adminRouter;
