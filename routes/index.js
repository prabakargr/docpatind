
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const user = require ('./user')
const slot = require('./timeslot')

router.use('/user',user),
router.use('/slot',slot)

module.exports=router
