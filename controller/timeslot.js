
const { check, validationResult } = require("express-validator/check");

const Slot = require("../model/timeslot");

const create = async (req, res) => {
    console.log("reached");
    [
        check("slotFrom", "Please enter Slot From").isEmpty(),
        check("slotTrom", "Please enter Slot To").isEmpty()
    ],

    errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {userId,slotFrom,slotTo,booked,slotDate,period,bookedBy}=req.body
    console.log(req.body);

    try {
        let slotOld=await Slot.findOne({ userId,slotFrom,slotDate})
        if (slotOld) {
            return res.status(400).json({
              msg: "Slot already exist"
            });
          }

      let slotObj=new Slot({
            userId,
            slotFrom,
            slotTo,
            slotDate,
            booked,
            period,
            bookedBy
        })
    let newSlot = await slotObj.save()
        if(newSlot){
            res.send({data:newSlot})
        }

    } catch (error) {
        throw error
    }
}

const slotsByUserIdandDate = async (req,res)=>{
    const {userId,slotDate}=req.body
    console.log(req.body);
    try {
        let slots=await Slot.find({
            "userId":req.body.userId,
            "slotDate":req.body.slotDate
            
        })
        if(slots){
            res.send({data:slots})
        }
    } catch (error) {
        throw error
    }
}
const slotsByBooked = async (req,res)=>{
    const {userId,slotDate,booked}=req.body
    console.log(req.body);
    try {
        let slots=await Slot.find({userId,slotDate,booked})
        if(slots){
            res.send({data:slots})
        }
    } catch (error) {
        throw error
    }
}

const blockSlot = async (req,res)=>{
    const {userId,slotDate,booked,slotFrom,bookedBy,period}=req.body
    console.log({booked});
    try {
        let book = await Slot.findOneAndUpdate({userId,slotFrom,slotDate,period},{booked,bookedBy})
        if(book){
            res.send({msg:"Slot Booked"})
        }else{
            res.send({msg:"book"})
        }
    } catch (error) {
        res.send(error) 
    }
}

module.exports={
    create:create,
    slotsByUserIdandDate:slotsByUserIdandDate,
    blockSlot:blockSlot,
    slotsByBooked:slotsByBooked
}