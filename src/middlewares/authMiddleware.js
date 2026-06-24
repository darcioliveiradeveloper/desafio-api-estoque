const jwt = require("jsonwebtoken");

// Middleware para validar token JWT
exports.verificarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // adiciona dados do usuário ao request
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido ou expirado" });
    }
};

// Middleware para verificar perfil ADMIN
exports.verificarAdmin = (req, res, next) => {
    if (req.user.perfil !== "ADMIN") {
        return res.status(403).json({ error: "Acesso restrito a administradores" });
    }
    next();
};

// Middleware para verificar perfil LEITOR
exports.verificarLeitor = (req, res, next) => {
    if (req.user.perfil !== "LEITOR") {
        return res.status(403).json({ error: "Acesso restrito a leitores" });
    }
    next();
};

