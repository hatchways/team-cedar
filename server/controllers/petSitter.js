const asyncHandler = require("express-async-handler");
const PetSitter = require("../models/PetSitter");
const { Schedule } = require("../models/Availability");

// @route POST /petsitter
// @desc create a new petsitter
// @access private

exports.createPetSitter = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {
    stripeConnectId,
    availabilityId,
    activatedAvailabilitySchedule,
    rate,
    name,
    address,
    description,
    photo,
  } = req.body;
  const findPetSitter = await PetSitter.findOne({ userId });
  if (findPetSitter) {
    res.status(409);
    throw new Error("Already Exists");
  }
  const newPetSitter = await PetSitter.create({
    userId,
    name,
    address,
    stripeConnectId,
    availabilityId,
    activatedAvailabilitySchedule,
    rate,
    description,
    photo,
  });
  return res.status(201).json({ petsitter: newPetSitter });
});

// @route GET /petsitter
// @desc Get All petsitter and Search petsitter
// @access Private
exports.getAllPetSitter = asyncHandler(async (req, res, next) => {
  try {
    const findByAddress = req.query.address;
    const day = req.query.day;
    const from = req.query.from;
    const to = req.query.to;
    const populateOptions = {
      path: "activatedAvailabilitySchedule",
      match: {
        "timeSlots.day": { $eq: day },
        "timeSlots.startTime": { $eq: from },
        "timeSlots.endTime": { $eq: to },
      },
    };
    let petSitter;
    if (findByAddress && !day && !from && !to) {
      petSitter = await PetSitter.find({
        address: { $regex: findByAddress, $options: "i" },
      }).populate("activatedAvailabilitySchedule");
    } else if (day && from && to && !findByAddress) {
      petSitter = await PetSitter.find().populate(populateOptions);
    } else if (findByAddress && day && from && to) {
      petSitter = await PetSitter.find({
        address: { $regex: findByAddress, $options: "i" },
      }).populate(populateOptions);
    } else {
      petSitter = await PetSitter.find().populate(
        "activatedAvailabilitySchedule"
      );
    }
    return res.status(201).json({ petsitter: petSitter });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// @route PATCH /petsitter/:id/edit
// @desc update PetSitter by id
// @access private
exports.updatePetSitterById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const {
    stripeConnectId,
    availabilityId,
    activatedAvailabilitySchedule,
    rate,
  } = req.body;
  const petSitter = await PetSitter.findOneAndUpdate(
    { _id: id, userId },
    {
      stripeConnectId,
      availabilityId,
      activatedAvailabilitySchedule,
      rate,
    }
  );

  if (!petSitter) {
    res.status(404);
    throw new Error("Pet Sitter Not Found");
  }

  return res.status(200).json({
    success: {
      petsitter: petSitter,
    },
  });
});

