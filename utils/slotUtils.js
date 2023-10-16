const {ParkingSlotModel}=require("../Model/CarParkingModel")

const createParkingSlots = async (parkingLotSize) => {
    try {
      for (let i = 1; i <= parkingLotSize; i++) {
        const slot = new ParkingSlotModel({ slotNumber: i, carNumber: null });
        await slot.save();
      }
      console.log(`Parking slots for ${parkingLotSize} cars created successfully.`);
    } catch (error) {
      console.error('Error creating parking slots:', error);
    }
  };
  
  module.exports = { createParkingSlots };
  