const express = require("express");
const router = express.Router();
const movimentacaoController = require("../controllers/movimentacaoController");
const { verificarToken, verificarAdmin } = require("../middlewares/authMiddleware");

// Rota de movimentações (apenas ADMIN)
router.post("/", verificarToken, verificarAdmin, movimentacaoController.registrarMovimentacao);

module.exports = router;

