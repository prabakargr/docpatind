
const { check, validationResult } = require("express-validator/check");

const Slot = require("../model/timeslot");

const create = async (req, res) => {
    console.log("reached");
    [
        check("slot", "Please enter a valid password").isEmpty()
    ],

    errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {userId,slot,booked,slotDate}=req.body


    try {
        let slotOld=await Slot.findOne({ userId,slot,slotDate})
        if (slotOld) {
            return res.status(400).json({
              msg: "Slot already exist"
            });
          }

      let slotObj=new Slot({
            userId,
            slot,
            slotDate,
            booked
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
    try {
        let slots=await Slot.find({userId,slotDate})
        if(slots){
            res.send({data:slots})
        }
    } catch (error) {
        throw error
    }
}

const blockSlot = async (req,res)=>{
    const {userId,slotDate,booked,slot}=req.body
    try {
        let book = await Slot.findByIdAndUpdate({userId,slotDate,slot},{booked})
        if(book){
            res.send({data:book,msg:"success"})
        }
    } catch (error) {
        throw error
    }
}

module.exports={
    create:create,
    slotsByUserIdandDate:slotsByUserIdandDate,
    blockSlot:blockSlot
}