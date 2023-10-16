const {ParkingSlotModel} = require('../Model/CarParkingModel');

const getAllSlots= async(req,res)=>{
  try{
   const data= await ParkingSlotModel.find()
   res.status(201).json(data)

  }catch(err)
  {
    res.status(401).json(err.message)
  }

}

//======================park the slot================================

const parkCar = async (req, res) => {
  try {
    const { carNumber } = req.body;

    // Check if carNumber is provided
    if (!carNumber) {
      return res.status(400).json({ success: false, message: 'Car number is required.' });
    }
      
    const alreadyPresent=await ParkingSlotModel.findOne({carNumber})
    if(alreadyPresent)
    {
      return res.status(200).json({ success: false, message: 'Car Already Parked.' });
    }
    // Find an available slot
    const availableSlot = await ParkingSlotModel.findOne({ carNumber: null }).sort('slotNumber');

    if (!availableSlot) {
      return res.status(400).json({ success: false, message: 'Parking lot is full. No available slots.' });
    }

    // Assign the car to the available slot
    availableSlot.carNumber = carNumber;
    await availableSlot.save();

    res.json({ success: true, message: 'Car parked successfully', slot: availableSlot });
  } catch (error) {
    // Handle validation error for carNumber
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


//======================Unpark the slot================================


const unparkCar = async (req, res) => {
  try {
    const { slotNumber } = req.body;
    const parkingSlot = await ParkingSlotModel.findOne({ slotNumber });

    if (!parkingSlot) {
      return res.status(400).json(`Slot ${slotNumber} is invalid.`);
      
    //  throw new Error(`Slot ${slotNumber} is invalid.`);
    }

    if (!parkingSlot.carNumber) {
     return  res.status(400).json(`Slot ${slotNumber} is already empty.`);
      //throw new Error(`Slot ${slotNumber} is already empty.`);
    }

    const data = await ParkingSlotModel.findOneAndUpdate(
      { _id: parkingSlot._id },
      { carNumber: null },
      { new: true }
    );

    res.json({ success: true, message: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


//======================Get route================================
   

const getCarSlotInformation = async (req, res) => {
  try {
    const param = req.params.param;
    let query;

    if (isNaN(param)) {
      query = { carNumber: param };
    } else {
      query = { slotNumber: param };
    }

    const parkingSlot = await ParkingSlotModel.findOne(query);

    if (!parkingSlot) {
      return res.status(201).json('No information found for the provided param.');
    }

    res.json({
      success: true,
      carNumber: parkingSlot.carNumber,
      slotNumber: parkingSlot.slotNumber,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllSlots,
  parkCar,
  unparkCar,
  getCarSlotInformation,
};
