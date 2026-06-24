const Movimentacao = require("../models/Movimentacao");
const Product = require("../models/Product");

// Registrar movimentação de estoque (apenas ADMIN)
exports.registrarMovimentacao = async (req, res) => {
    try {
        const { produtoId, tipo, quantidade, motivo } = req.body;

        const produto = await Product.findById(produtoId);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        // Validação de saída: não permitir estoque negativo
        if (tipo === "SAIDA" && quantidade > produto.saldo) {
            return res.status(400).json({ error: "Quantidade solicitada maior que o saldo disponível" });
        }

        // Atualizar saldo do produto
        if (tipo === "ENTRADA") {
            produto.saldo += quantidade;
        } else if (tipo === "SAIDA") {
            produto.saldo -= quantidade;
        }
        await produto.save();

        // Registrar movimentação
        const movimentacao = new Movimentacao({
            produto: produto._id,
            tipo,
            quantidade,
            motivo,
            usuario: req.user.id
        });

        await movimentacao.save();

        res.status(201).json({ message: "Movimentação registrada com sucesso", movimentacao });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar movimentação" });
    }
};

