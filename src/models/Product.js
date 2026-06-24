const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
        trim: true
    },
    preco: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        trim: true
    },
    saldo: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);

