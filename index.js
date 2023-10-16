const express = require("express");
const { connection } = require("./db");
const router = require("./routes/parkingCarRoute");
var cors = require('cors')
const { createParkingSlots } = require("./utils/slotUtils");

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    try {
        res.status(200).json("Welcome to Car Parking");
    } catch (err) {
        res.status(401).json(err.message);
    }
});

app.use("/parking", router);

const parkingLotSize = process.env.PARKING_LOT_SIZE || 10; // Default size 10 if not provided

app.listen(8001, async () => {
    try {
        await connection;
        createParkingSlots(parkingLotSize);
        console.log("Connected to Database");
        console.log(`Server is running at port 6000`);
    } catch (err) {
        console.log(err.message);
    }
});
