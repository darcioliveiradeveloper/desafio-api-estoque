const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String, required: true, minlength: 6 },
  perfil: { type: String, enum: ["ADMIN", "LEITOR"], default: "LEITOR" }
}, { timestamps: true });

// Antes de salvar, criptografa a senha
UserSchema.pre("save", function (next) {
  const user = this; // aqui declaramos corretamente

  if (!user.isModified("senha")) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.senha, salt, function (err, hash) {
      if (err) return next(err);
      user.senha = hash;
      next();
    });
  });
});

// Método para comparar senha
UserSchema.methods.compararSenha = function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("User", UserSchema);
