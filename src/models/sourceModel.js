const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    initialValue: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    balance: { type: Number, default: 0 },
    earnings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Earnings" }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "expenses" }],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date },
  },
  //   { _id: false }
  { collection: "source" }
);

// Middleware para establecer createdAt antes de guardar el documento
sourceSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
sourceSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
sourceSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
sourceSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const Source = mongoose.model("source", sourceSchema);

module.exports = Source;
