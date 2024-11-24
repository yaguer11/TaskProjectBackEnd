const express = require("express");
const router = express.Router();
const epicController = require("../controller/epic");
const { verifyToken } = require("../middleware/authMiddleware"); // Middleware para proteger las rutas

// Rutas protegidas para epics
router.get("/", verifyToken, epicController.getAllEpics);
router.get("/:id", verifyToken, epicController.getEpicById);
router.post("/", verifyToken, epicController.createEpic);
router.put("/:id", verifyToken, epicController.updateEpic);
router.delete("/:id", verifyToken, epicController.deleteEpic);

module.exports = router;
