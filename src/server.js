// src/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
    .catch(err => console.error("❌ Erro na conexão:", err));

// Rota inicial de teste
app.get("/", (req, res) => {
    res.status(200).json({ message: "Guardião do Almoxarifado API - Online" });
});

// Importar rotas
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const movimentacaoRoutes = require("./routes/movimentacaoRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");

// Usar rotas
app.use("/auth", authRoutes);
app.use("/produtos", productRoutes);
app.use("/movimentacoes", movimentacaoRoutes);
app.use("/relatorios", relatorioRoutes);

// Porta configurada via .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
