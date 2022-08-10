import Hour from '../models/hoursModel.js'
import Hall from '../models/hallModel.js'

export const createHour=async(req,res,next)=>{
    const hallId= req.params.hallId//beacause take hall create Hour to the hall
    const newHour=new Hour (req.body)
    console.log(hallId);
    try {
        const saveHour=await newHour.save()
        try {
            await Hall.findByIdAndUpdate(hallId,{$push:{hours:saveHour._id}},{new:true})
        } catch (error) {
            next(error)
        }
        res.status(201).json({saveHour})
    } catch (error) {
        next(error)
    }
}

export const updateHour=async(req,res,next)=>{
    try {
        let updateHour=await Hour.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateHour)
    } catch (error) {
        next(error)
    }
}

export const deleteHour=async(req,res,next)=>{
    const hallId= req.params.hallId
    try {
        await Hour.findByIdAndDelete(req.params.id)
        try {
            await Hall.findByIdAndUpdate(hallId,{$pull :{hours:req.params.id}})
        } catch (error) {   
            next(error)
        }
        res.status(200).json("hall is deleted")
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Hour.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}
export const getAll=async(req,res,next)=>{
    try {
        const get=await Hour.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const updateHourAvailability=async(req,res,next)=>{
    try {
        let found=await Hour.updateOne({"hourNumbers._id":req.params.id},{$push:{
            "hourNumbers.$[].unavailableDates":{date:req.body.date,name:req.body.name}
        }})
        
        console.log(req.body.date,req.body.name,req.params.id);
        res.send(found)
    } catch (error) {
        next(error)
    }
}

export const deleteUpdateHourAvailability=async(req,res,next)=>{
    try {
        let updateHour=await Hour.updateOne({"_id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:req.body.dates}
        }})
        console.log(updateHour);
        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
    } catch (error) {
        next(error)
    }
}

export const deleteThePast=async(req,res,next)=>{
    try {
        const data=[]
        
        let updateHour=await Hour.updateOne({"_id":req.params.id},{$pull:{
            "hourNumbers.$[].unavailableDates":{date:{$lt:req.body.dates}}
        }})
        // console.log(updateHour);
        res.status(200).json({data:updateHour,message:"hoursNo deleted "})
    } catch (error) {
        next(error)
    }
}