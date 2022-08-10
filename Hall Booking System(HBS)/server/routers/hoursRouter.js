import express from "express";
import { createHour, deleteHour, updateHour ,getById ,getAll,updateHourAvailability,deleteUpdateHourAvailability,deleteThePast} from "../controllers/hoursController.js";
import veriftyAdmin from "../middlewares/adminAuth.js";

const router=express.Router()

router.post("/:hallId",createHour)
router.put("/:id",updateHour)
router.delete("/:id/:hallId",deleteHour)
router.put("/find/:id",getById)
router.get("/",getAll)
router.put("/availability/:id",updateHourAvailability)
router.put("/deleteavailability/:id",deleteUpdateHourAvailability)
router.put("/deleteThePast/:id",deleteThePast)

export default router