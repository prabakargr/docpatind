
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const userController=require('../controller/user')


router.route('/signup').post(userController.signup)
router.route('/login').post(userController.login)
router.route('/allUsers').get(auth,userController.allUsers)
router.route('/me').get(auth,userController.me)




module.exports = router;