import express from "express";
import cors from "cors";
import adminRoutes from "./route/adminRoute.js";
import router from "./middleware/register.js";
import customerRouter from "./route/customerRoute.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Digital MENU API is running",
  });
});

app.use("/api/admin", adminRoutes);
app.use("/api/register", router);
app.use("/api/customer", customerRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`,
  );
  console.log(
    `Database configuration loaded: ${process.env.DB_HOST ? "yes" : "no"}`,
  );
});
