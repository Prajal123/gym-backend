const express=require('express');
const router= express.Router();

const {addGym, fetchGym, updateGym, deleteGym}= require("../controllers/gymController");
const protect = require('../middlewares/authMiddleware');

router.route("/addGym").post(protect,addGym);
router.route("/fetchGym").get(protect,fetchGym);
router.route("/updateGym").post(protect,updateGym);
router.route("/deleteGym").get(protect,deleteGym);
module.exports=router