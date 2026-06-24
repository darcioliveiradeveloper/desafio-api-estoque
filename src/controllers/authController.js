const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registrar usuário
exports.register = async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        // Verifica se já existe usuário com esse email
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        // Cria novo usuário
        const novoUsuario = new User({ nome, email, senha, perfil });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};

// Login de usuário
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        // Usa o método do model para comparar senha
        const senhaValida = await usuario.compararSenha(senha);
        if (!senhaValida) {
            return res.status(400).json({ error: "Senha inválida" });
        }

        const token = jwt.sign(
            { id: usuario._id, perfil: usuario.perfil },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login realizado com sucesso", token });
    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ error: "Erro ao realizar login" });
    }
};
