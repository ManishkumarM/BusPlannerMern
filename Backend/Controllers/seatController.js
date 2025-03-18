const express = require("express");
const SeatModel = require("../Models/seat"); // Assuming Seat Model is present
const app = express.Router();

// API to Lock a Seat
app.post("/lock", async (req, res) => {
  const { seatId, userId, busId, lockDuration } = req.body; // seatId, userId, busId, lockDuration (in seconds)

  try {
    // Find the seat
    const seat = await SeatModel.findOne({ seatId, busId });
    if (!seat) return res.status(404).send("Seat not found");

    // Check if the seat is already locked
    if (seat.lockedBy && seat.lockedUntil > new Date()) {
      return res.status(400).send("Seat is already locked by another user");
    }

    // Lock the seat for the specified duration
    const lockUntil = new Date(new Date().getTime() + lockDuration * 1000); // Lock for the given duration
    seat.lockedBy = userId;
    seat.lockedUntil = lockUntil;
    await seat.save();

    return res.send({ message: "Seat locked successfully", seat });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API to Release a Locked Seat
app.post("/release", async (req, res) => {
  const { seatId, busId } = req.body;

  try {
    // Find the seat
    const seat = await SeatModel.findOne({ seatId, busId });
    if (!seat) return res.status(404).send("Seat not found");

    // Check if the seat is locked
    if (!seat.lockedBy) {
      return res.status(400).send("Seat is not locked");
    }

    // Release the lock
    seat.lockedBy = null;
    seat.lockedUntil = null;
    await seat.save();

    return res.send({ message: "Seat released successfully", seat });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API to Book a Seat (Only if it’s not locked)
app.post("/book", async (req, res) => {
  const { seatId, userId, busId } = req.body;

  try {
    // Find the seat
    const seat = await SeatModel.findOne({ seatId, busId });
    if (!seat) return res.status(404).send("Seat not found");

    // Check if the seat is locked by another user
    if (seat.lockedBy && seat.lockedBy !== userId) {
      return res.status(400).send("Seat is locked by another user");
    }

    // Book the seat
    seat.lockedBy = null; // Remove the lock
    seat.lockedUntil = null; // Remove lock time
    seat.bookedBy = userId; // Mark as booked by this user
    await seat.save();

    return res.send({ message: "Seat booked successfully", seat });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// API to Check the Status of a Seat
app.post("/status", async (req, res) => {
  const { seatId, busId } = req.body;

  try {
    // Find the seat
    const seat = await SeatModel.findOne({ seatId, busId });
    if (!seat) return res.status(404).send("Seat not found");

    // Return the seat status
    return res.send({
      seatId: seat.seatId,
      lockedBy: seat.lockedBy,
      lockedUntil: seat.lockedUntil,
      bookedBy: seat.bookedBy,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
