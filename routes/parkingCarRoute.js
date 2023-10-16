const express = require('express');
const parkingController = require('../controller/parkingController');
const rateLimiter = require('../utils/rateLimiter');

const router = express.Router();

router.post('/park', rateLimiter, parkingController.parkCar);

router.post('/unpark', rateLimiter, parkingController.unparkCar);

router.get('/info/:param', rateLimiter, parkingController.getCarSlotInformation );

router.get("/allslot",rateLimiter,parkingController.getAllSlots)

module.exports = router;
