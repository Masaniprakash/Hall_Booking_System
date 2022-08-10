import Hall from '../models/hallModel.js'
import Hours from '../models/hoursModel.js'

export const createHall=async(req,res,next)=>{
    let hours=[{"hourNumbers":[{"number":1}]},{"hourNumbers":[{"number":2}]},{"hourNumbers":[{"number":3}]},
    {"hourNumbers":[{"number":4}]},{"hourNumbers":[{"number":5}]},{"hourNumbers":[{"number":6}]},
    {"hourNumbers":[{"number":7}]}]
    const newHall= new Hall(req.body)
    try {
        let saveHall=await newHall.save()
        
        let AddHours= await  Hours.insertMany(hours)
        // console.log(AddHours);
        // console.log(AddHours[0]._id);
        // console.log(AddHours[0].hourNumbers);
        // await AddHours.save()
        // AddHours.map((item,index)=>console.log(item._id))
        // console.log(AddHours[0]._id);
        AddHours.map(async(item,index)=>{
        // console.log(item[0]);
        try {
            let found=await Hall.findById(saveHall._id)
            await found.updateOne({$push:{hours:item._id}})
            // console.log(saveHall._id)
            // console.log(item[index]._id)
        } catch (error) {
            next(error)
        }

       })

        // console.log(ho/ur)
                res.status(201).json([saveHall])
    } catch (error) {
        next(error)
    }
}

export const updateHall=async(req,res,next)=>{
    try {
        let updateHall=await Hall.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateHall)
    } catch (error) {
        next(error)
    }
}

export const deleteHall=async(req,res,next)=>{
    try {
        await Hall.findByIdAndDelete(req.params.id)
        res.status(200).json("Hall is deleted")
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Hall.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const getAll=async(req,res,next)=>{
    const {min,max,...other}=req.query
    try {
        //if not give min,max or value is set-- 
        //min max used purpose is to find min max price filter in single Hall page
        const get=await Hall.find({...other,cheapestPrice:{$lt:max || 10000,$gt:min || 1}}).limit(req.query.limit)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}


/*not use Promise.all it error as "Converting circular structure to JSON\n    --> starting at object with 
constructor 'Topology'\n    |     property 's' -> object with constructor 'Object'\n  | property 
'sessionPool' -> object with constructor 'ServerSessionPool'\n    --- property 'topology' closes the circle"*/
export const getHallHours = async (req,res,next)=>{
    try {
        const hall=await Hall.findById(req.params.id)
        const list = await  Promise.all(hall.hours.map(hour=>{
                return Hours.findById(hour)
            }))
        
        res.status(200).json(list)

    } catch (error) {
        next(error)
    }
}