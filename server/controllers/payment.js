const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");



exports.getPayment = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const payment = await Payment.findById(id).populate('totalPayment')
  if(profile){
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
  const payment = await  Payment.findById(id);
  if (!payment) {
    res.status(404);
    throw new Error("Payment doesn't exist");
  }
  const makePayment = await Payment.findByIdAndUpdate(
    id,
    {
      paid: true
    }
  )
  if (makePayment){
    res.status(200).json({
      success: {   
        payment: makePayment,
        msg: "Payment Complete"
      }
    });
  }
});

exports.canclePayment =  asyncHandler(async (req, res, next) => {
  const userID = req.user.id
  const {id} = req.params;
  const checkMerchant = await  Payment.find({sitterId: userID});
  if (!checkMerchant) {
    res.status(203);
    throw new Error("Only Merchant Can Cancle");
  } 
  const canclePayment = await Payment.findByIdAndUpdate(
    id,
    {
      paid: false
    }
  )
  if (canclePayment){
    res.status(200).json({
      success: {   
        payment: canclePayment,
        msg: "Payment Cancle Complete"
      }
    });
  }
})

exports.getAllPayments = asyncHandler(async (req, res, next) => {
const payment = await Payment.find({userId: req.user.id}).populate('totalPayment');
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