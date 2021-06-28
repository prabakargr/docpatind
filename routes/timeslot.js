
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const slotController=require('../controller/timeslot');

router.route('/create').post(slotController.create)
router.route('/findSlots').post(slotController.slotsByUserIdandDate)
router.route('/blockSlot').post(slotController.blockSlot),
router.route('/slotsByUser').post(slotController.slotsByBooked)

module.exports = router
