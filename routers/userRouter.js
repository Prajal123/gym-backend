const express=require('express');
const router=express.Router();

const {registerUser, authUser, updateUser}=require('../controllers/userController');
const protect=require("../middlewares/authMiddleware");

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/update').post(updateUser);

module.exports=router;