const express = require("express");
const router = express.Router();
const storyController = require("../controller/story");
const { verifyToken } = require("../middleware/authMiddleware"); // Middleware para proteger las rutas

// Rutas protegidas para historias
router.get("/", verifyToken, storyController.getAllStories);
router.get("/:id", verifyToken, storyController.getStoryById);
router.post("/", verifyToken, storyController.createStory);
router.put("/:id", verifyToken, storyController.updateStory);
router.delete("/:id", verifyToken, storyController.deleteStory);

module.exports = router;
