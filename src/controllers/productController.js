const Product = require("../models/Product");

// Criar produto (ADMIN)
exports.createProduct = async (req, res) => {
    try {
        const { nome, codigo, descricao, preco, categoria } = req.body;
        const produtoExistente = await Product.findOne({ codigo });
        if (produtoExistente) {
            return res.status(400).json({ error: "Código de produto já cadastrado" });
        }

        const novoProduto = new Product({ nome, codigo, descricao, preco, categoria });
        await novoProduto.save();

        res.status(201).json({ message: "Produto cadastrado com sucesso", produto: novoProduto });
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar produto" });
    }
};

// Listar todos os produtos (livre)
exports.getAllProducts = async (req, res) => {
    try {
        const produtos = await Product.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar produtos" });
    }
};

// Buscar produto por ID (livre)
exports.getProductById = async (req, res) => {
    try {
        const produto = await Product.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar produto" });
    }
};

// Editar produto (ADMIN)
exports.updateProduct = async (req, res) => {
    try {
        const produto = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(200).json({ message: "Produto atualizado com sucesso", produto });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
};

// Excluir produto (ADMIN)
exports.deleteProduct = async (req, res) => {
    try {
        const produto = await Product.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao excluir produto" });
    }
};
