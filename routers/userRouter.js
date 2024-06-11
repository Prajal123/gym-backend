const express=require('express');
const router=express.Router();

const {registerUser, authUser}=require('../controllers/userController');
const protect=require("../middlewares/authMiddleware");

router.route('/').post(registerUser);
router.route('/login').post(authUser);

module.exports=router;