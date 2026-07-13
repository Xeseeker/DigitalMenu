import db from "../config/db.js";

const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id DESC");
    return res.status(200).json({ categories: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllMenuItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT mi.*, c.name AS category_name
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

const getCategoryItems = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [rows] = await db.query(
      `SELECT mi.*, c.name AS category_name
       FROM menu_items mi
       LEFT JOIN categories c ON mi.category_id = c.id
       WHERE mi.category_id = ?
       ORDER BY mi.id DESC`,
      [categoryId],
    );
    return res.status(200).json({ items: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getItemDetails = async (req, res) => {
  try {
    const { itemId } = req.params;
    const [rows] = await db.query(
      `SELECT mi.*, c.name AS category_name
       FROM menu_items mi
       LEFT JOIN categories c ON mi.category_id = c.id
       WHERE mi.id = ?`,
      [itemId],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ item: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const addRating = async (req, res) => {
  try {
  } catch (error) {}
};
const addComment = async (req, res) => {
  try {
  } catch (error) {}
};
const getComments = async (req, res) => {
  try {
  } catch (error) {}
};
const getRatings = async (req, res) => {
  try {
  } catch (error) {}
};

export {
  getCategories,
  getAllMenuItems,
  getCategoryItems,
  getComments,
  getItemDetails,
  getRatings,
  addComment,
  addRating,
};
