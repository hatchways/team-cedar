const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");



exports.getPayment = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const payment = await Payment.findById(id);
  if(payment){
    res.status(200).json({
      success: {   
        payment: payment 
      }
    });
  } else {
    res.status(404);
    throw new Error("Pls enter valid payment id");
  }   
})

exports.makePayment = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;
  const payment = await  Payment.findOne({userId:userId , id});
  if (!payment) {
    res.status(404);
    throw new Error("Payment doesn't exist");
  }
  payment.set({paid: true})
  const updatedPayment = await payment.save()
  if (updatedPayment){
    res.status(200).json({
      success: {   
        payment: updatedPayment,
        msg: "Payment Complete"
      }
    });
  }
});

exports.cancelPayment =  asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {id} = req.params;
  const merchantPayment = await  Payment.findOne({id: id, sitterId: userId});
  if (!merchantPayment) {
    res.status(203);
    throw new Error("Only Merchant Can Cancle");
  }  else { 
    merchantPayment.set(({paid: false}))
    const updatedPayment = await merchantPayment.save();
    if (updatedPayment){
      res.status(200).json({
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
if(payment){
  res.status(200).json({
    success: {   
      payment: payment    
    }
  });
} else {
  res.status(404);
  throw new Error("Payments Not Found");
}   
})