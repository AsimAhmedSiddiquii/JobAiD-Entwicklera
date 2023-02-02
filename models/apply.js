const mongoose = require("mongoose");

const User = require("../models/user");
const Job = require('../models/job')

const applySchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: User },
    jobId: { type: mongoose.SchemaTypes.ObjectId, ref: Job },
    response: String,
    status: String
});

module.exports = mongoose.model("applies", applySchema);
