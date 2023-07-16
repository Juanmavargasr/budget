const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    modifiedAt: { type: Date }, // Fecha de modificación
  },
  { collection: "earnings" }
);

// Middleware para establecer createdAt antes de guardar el documento
userSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
userSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
userSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
userSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
