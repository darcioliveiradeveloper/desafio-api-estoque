const express = require("express");
const router = express.Router();
const relatorioController = require("../controllers/relatorioController");
const { verificarToken } = require("../middlewares/authMiddleware");

// Rotas de relatórios (acesso liberado para todos os usuários logados)
router.get("/saldo", verificarToken, relatorioController.getSaldo);
router.get("/historico", verificarToken, relatorioController.getHistorico);

module.exports = router;

