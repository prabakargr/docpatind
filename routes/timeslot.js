
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const slotController=require('../controller/timeslot');

router.route('/create').post(auth,slotController.create)
router.route('/findSlots').post(auth,slotController.slotsByUserIdandDate)
router.route('/blockSlot').post(slotController.blockSlot)

module.exports = router
