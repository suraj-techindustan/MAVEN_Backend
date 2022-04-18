const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    resetToken: { type: String, required: true },
    expiresIn: Number,
    expired: { type: Boolean, default: false },
    createdAt: { type: Number },
})

const Otp = mongoose.model('Otps', otpSchema)

exports.Otp = Otp