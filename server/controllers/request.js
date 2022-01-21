const Requset = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request/
// @desc Get this user all request 
// @access Private
exports.getAllRequest = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const requests = await Request.find({ userId: userId })

  res.status(200).json({ requests })
})

// @route POST /request/
// @desc create new request 
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { sitterId, start, end, description } = req.body
  const userId = req.user.id

  const request = await Request.create({ userId, sitterId, start, end, description })

  if (request) {
    res.status(201).json({ success: { request } })
  } else {
    res.status(400)
    throw new Error('Invalid request data')
  }

})

// @route PUT /request/:id/edit
// @desc update request by id
// @access private
exports.updateRequestById = asyncHandler(async (req, res, next) => {
  const { accepted, declined } = req.body

  const request = await Request.findOneAndUpdate(req.params.id, { accepted, declined }, { new: true })

  if (request) {
    res.status(200).json({ success: { request } })
  } else {
    res.status(404)
    throw new Error('Request not found.')
  }
})


