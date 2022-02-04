const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");


exports.createPayment = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {sitterId, rate, startTime, endTime, customerId} = req.body;
  const createPayment = await Payment.create({
    userId,
    sitterId,
    rate,
    hoursOfService: {
        startTime,
        endTime
    },
    customerId
  });
  if (!createPayment){
    res.status(400);
    throw new Error("Invalid Data");
  }
  return res.status(200).json({
      success: {   
        payment: createPayment 
      }
    });
})


exports.getPayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const payment = await Payment.findById(id);
  if (!payment){
    res.status(404);
    throw new Error("Pls enter valid payment id");
  }
  return res.status(200).json({
      success: {   
        payment: payment 
      }
    });
})

exports.makePayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const payment = await  Payment.findOne({userId:userId , id});
  if (!payment) {
    res.status(404);
    throw new Error("Payment doesn't exist");
  }
  payment.set({paid: true})
  const updatedPayment = await payment.save()
  if (updatedPayment){
   return res.status(200).json({
      success: {   
        payment: updatedPayment,
        msg: "Payment Complete"
      }
    });
  }
});

exports.cancelPayment =  asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const merchantPayment = await  Payment.findOne({id: id, sitterId: userId});
  if (!merchantPayment) {
    res.status(401);
    throw new Error("Only merchant can cancel");
  }  else { 
    merchantPayment.set(({cancel: true}))
    const updatedPayment = await merchantPayment.save();
    if (updatedPayment){
    return res.status(200).json({
        success: {   
          payment: updatedPayment,
          msg: "Payment has been Canceled"
        }
      });
    }
  }
})

exports.getAllPayments = asyncHandler(async (req, res, next) => {
const payment = await Payment.find({userId: req.user.id});
 return res.status(200).json({
    success: {   
      payment: payment    
    }
  });

})

exports.getCurrentPayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.find({userId: req.user.id , paid: false, cancel: false }).populate("sitterId" ,"name");
   return res.status(200).json({
      success: {   
        payment: payment    
      }
    });
  })

  exports.getPaidPayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.find({userId: req.user.id , paid: true, cancel: false }).populate("sitterId" ,"name");
     return res.status(200).json({
        success: {   
          payment: payment    
        }
      });
    })
    
  