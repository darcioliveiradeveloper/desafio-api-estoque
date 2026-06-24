const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verificarToken, verificarAdmin } = require("../middlewares/authMiddleware");

// Rotas de produtos
router.post("/", verificarToken, verificarAdmin, productController.createProduct);
router.get("/", verificarToken, productController.getAllProducts);
router.get("/:id", verificarToken, productController.getProductById);
router.put("/:id", verificarToken, verificarAdmin, productController.updateProduct);
router.delete("/:id", verificarToken, verificarAdmin, productController.deleteProduct);

module.exports = router;

