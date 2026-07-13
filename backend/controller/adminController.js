import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uploadToCloudinary from "../util/uploadToCloudinary.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const [rows] = await db.query(
      `
      SELECT *
      FROM admins
      WHERE email = ?
      `,
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = rows[0];

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ message: "Category name is required" });

    // handle image upload to Cloudinary (support file, data-uri or remote URL)
    let imageUrl = null;
    try {
      if (req.file?.buffer) {
        const result = await uploadToCloudinary(req.file.buffer, "categories");

        imageUrl = result.secure_url;
      }
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      return res.status(500).json({ message: "Image upload failed" });
    }

    const [result] = await db.query(
      "INSERT INTO categories (name, description, image) VALUES (?, ?, ?)",
      [name, description || null, imageUrl || null],
    );

    const insertedId = result.insertId;
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
      insertedId,
    ]);
    return res
      .status(201)
      .json({ message: "Category created", category: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getCategoriesAdmin = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
    return res.status(200).json({ categories: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, image } = req.body;

    // build dynamic query
    const fields = [];
    const values = [];
    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }
    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }
    if (image !== undefined) {
      // if image provided, attempt upload to Cloudinary
      let imageUrl = image;
      try {
        if (req.file && req.file.path) {
          const uploadRes = await cloudinary.uploader.upload(req.file.path, {
            folder: "digital_menu/categories",
          });
          imageUrl = uploadRes.secure_url;
        } else if (image) {
          const uploadRes = await cloudinary.uploader.upload(image, {
            folder: "digital_menu/categories",
          });
          imageUrl = uploadRes.secure_url;
        }
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({ message: "Image upload failed" });
      }

      fields.push("image = ?");
      values.push(imageUrl);
    }

    if (fields.length === 0)
      return res.status(400).json({ message: "No fields to update" });

    // add updated_at
    fields.push("updated_at = NOW()");

    const sql = `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`;
    values.push(categoryId);

    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
      categoryId,
    ]);
    return res
      .status(200)
      .json({ message: "Category updated", category: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [
      categoryId,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const { categoryId, name, description, price, is_available } = req.body;
    //const categoryId = category || req.body.category_id;
    console.log(req.body);
    if (!categoryId || !name || !price) {
      return res
        .status(400)
        .json({ message: "category, name and price are required" });
    }

    // handle image upload
    let imageUrl = null;
    try {
      if (req.file?.buffer) {
        const result = await uploadToCloudinary(req.file.buffer, "menu_items");

        imageUrl = result.secure_url;
      }
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      return res.status(500).json({ message: "Image upload failed" });
    }

    const isAvailableNum = is_available ? 1 : 0;

    const [result] = await db.query(
      "INSERT INTO menu_items (category_id, name, description, price, image, is_available) VALUES (?, ?, ?, ?, ?, ?)",
      [
        categoryId,
        name,
        description || null,
        price,
        imageUrl || null,
        isAvailableNum,
      ],
    );

    const insertedId = result.insertId;
    const [rows] = await db.query("SELECT * FROM menu_items WHERE id = ?", [
      insertedId,
    ]);
    return res
      .status(201)
      .json({ message: "Menu item created", item: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllMenuItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT mi.*, c.name as category_name
       FROM menu_items mi
       LEFT JOIN categories c ON mi.category_id = c.id
       ORDER BY mi.id DESC`,
    );
    return res.status(200).json({ items: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getSingleItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const [rows] = await db.query("SELECT * FROM menu_items WHERE id = ?", [
      itemId,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ item: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { category_id, name, description, price, image, is_available } =
      req.body;

    const fields = [];
    const values = [];
    if (category_id !== undefined) {
      fields.push("category_id = ?");
      values.push(category_id);
    }
    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }
    if (description !== undefined) {
      fields.push("description = ?");
      values.push(description);
    }
    if (price !== undefined) {
      fields.push("price = ?");
      values.push(price);
    }
    if (image !== undefined) {
      // upload new image if provided
      let imageUrl = image;
      try {
        if (req.file && req.file.path) {
          const uploadRes = await cloudinary.uploader.upload(req.file.path, {
            folder: "digital_menu/items",
          });
          imageUrl = uploadRes.secure_url;
        } else if (image) {
          const uploadRes = await cloudinary.uploader.upload(image, {
            folder: "digital_menu/items",
          });
          imageUrl = uploadRes.secure_url;
        }
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({ message: "Image upload failed" });
      }

      fields.push("image = ?");
      values.push(imageUrl);
    }
    if (is_available !== undefined) {
      fields.push("is_available = ?");
      values.push(is_available ? 1 : 0);
    }

    if (fields.length === 0)
      return res.status(400).json({ message: "No fields to update" });

    fields.push("updated_at = NOW()");
    const sql = `UPDATE menu_items SET ${fields.join(", ")} WHERE id = ?`;
    values.push(itemId);

    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Item not found" });

    const [rows] = await db.query("SELECT * FROM menu_items WHERE id = ?", [
      itemId,
    ]);
    return res.status(200).json({ message: "Item updated", item: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const [result] = await db.query("DELETE FROM menu_items WHERE id = ?", [
      itemId,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllComments = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteComment = async (req, res) => {
  try {
  } catch (error) {}
};

const getAllRatings = async (req, res) => {
  try {
  } catch (error) {}
};

const generateQRCode = async (req, res) => {
  try {
  } catch (error) {}
};

const downloadQRCode = async (req, res) => {
  try {
  } catch (error) {}
};

export {
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
  login,
};
