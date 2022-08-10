import express from "express";
import { createHall, updateHall,deleteHall,getById,getByName, getAll,getHallHours} from "../controllers/hallController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";
const router=express.Router()

router.post("/",createHall)
router.put("/:id",updateHall)
router.delete("/:id",deleteHall)
router.get("/find/:id",getById)
router.post("/find",getByName)
router.get("/",getAll)
router.get("/getHallHours/:id",getHallHours)


export default router