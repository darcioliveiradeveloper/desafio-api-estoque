const mongoose = require("mongoose");

const MovimentacaoSchema = new mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    tipo: {
        type: String,
        enum: ["ENTRADA", "SAIDA"],
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        min: 1
    },
    motivo: {
        type: String,
        required: true,
        trim: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Movimentacao", MovimentacaoSchema);

