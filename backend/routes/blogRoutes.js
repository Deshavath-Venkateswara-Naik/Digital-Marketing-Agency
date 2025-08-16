const express = require("express");
const router = express.Router();
const blogController = require("./controllers/blogController");

// Blog routes
router.get("/", blogController.getAllBlogPosts);
router.get("/:id", blogController.getBlogPostById);
router.post("/create", blogController.createBlogPost); // 🔹 New create route
router.put("/update/:id", blogController.updateBlogPost); // 🔹 New update route
router.delete("/:id", blogController.deleteBlogPost);

module.exports = router;
