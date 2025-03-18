const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true }, // Seat identifier (e.g., "A1")
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true }, // Bus reference
  lockedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // User who locked the seat
  lockedUntil: { type: Date, default: null }, // Lock expiration time
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // User who booked the seat
});

module.exports = mongoose.model("Seat", seatSchema);
