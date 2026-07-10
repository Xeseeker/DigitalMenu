import express from "express";
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
adminRouter.post("/categories", addCategory);
adminRouter.get("/categories", getCategoriesAdmin);
adminRouter.put("/categories/:categoryId", updateCategory);
adminRouter.delete("/categories/:categoryId", deleteCategory);

// Menu Items
adminRouter.post("/items", addMenuItem);
adminRouter.get("/items", getAllMenuItems);
adminRouter.get("/items/:itemId", getSingleItem);
adminRouter.put("/items/:itemId", updateMenuItem);
adminRouter.delete("/items/:itemId", deleteMenuItem);

// Comments
adminRouter.get("/comments", getAllComments);
adminRouter.delete("/comments/:commentId", deleteComment);

// Ratings
adminRouter.get("/ratings", getAllRatings);

// QR Code
adminRouter.post("/qr/generate", generateQRCode);
adminRouter.get("/qr/download", downloadQRCode);

export default adminRouter;
