const mongoose = require('mongoose');

const parkingSlotSchema = mongoose.Schema({
  slotNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  carNumber: {
    type: String,
    unique: true, // Uncomment to make it unique
    //required: true, // Uncomment to make it required
  },
});

const ParkingSlotModel = mongoose.model('ParkingSlot', parkingSlotSchema);

module.exports = { ParkingSlotModel };
