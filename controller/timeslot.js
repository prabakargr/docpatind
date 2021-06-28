
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
    console.log({booked});
    try {
        let book = await Slot.findOneAndUpdate({userId,slot,slotDate},{booked})
        // ((err,book)=>{
        //     if (!err) {
        //         res.send({ data: book })
        //     } else {
        //         res.send({ data: err, msg: "failed" })
        //     }
        // }))
        // (err,book=>{
        //     if (err) {
        //         res.send({ data: err, msg: "failed" })
        //     } else {
        //         res.send({ data: Slot.findOne({userId,slot,slotDate}) })
        //     }
        // })
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
    blockSlot:blockSlot
}