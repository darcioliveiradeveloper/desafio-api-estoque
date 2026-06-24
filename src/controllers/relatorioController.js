const Product = require("../models/Product");
const Movimentacao = require("../models/Movimentacao");

// Relatório de saldo atual dos produtos
exports.getSaldo = async (req, res) => {
    try {
        const produtos = await Product.find({}, "nome codigo saldo categoria");
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: "Erro ao gerar relatório de saldo" });
    }
};

// Relatório de histórico de movimentações
exports.getHistorico = async (req, res) => {
    try {
        const historico = await Movimentacao.find()
            .populate("produto", "nome codigo")
            .populate("usuario", "nome email perfil")
            .sort({ createdAt: -1 });

        res.status(200).json(historico);
    } catch (err) {
        res.status(500).json({ error: "Erro ao gerar relatório de histórico" });
    }
};

