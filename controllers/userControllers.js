const { User, joiValidation } = require('../Models/users')

const passwordHash = require('password-hash');
const authenticateUser = require("../middleware/auth")
const { Otp } = require('../Models/otp')
const asyncMiddleWare = require('../middleware/async') 

const { otpGenerator, sendEmail } = require('../common/utils');


// Router.get('/home', (req, res) => {
//     res.send('home')
// })

// Router.post('/adduser', [joiValidation], async (req, res) => {
exports.adduser=asyncMiddleWare(async(req, res) => {

    const { userName = "", email = "", password = "" } = req.body || {}

    const hashedPassword = passwordHash.generate(password);


    const user = new User({
        userName,
        email,
        password: hashedPassword
    })

    await user.save()
    res.status(200).send({
        message: "User Created Successfully",
        value: user
    })


})

exports.login =asyncMiddleWare(async(req, res) => {

    try {

        const { email } = req.body
        if (!email) return res.status(400).send({ message: "Please enter Email" })

        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) return res.status(400).send({
            message: "Invalid Email"
        })

        const isValidPassword = passwordHash.verify(req.body.password, user.password)
        if (!isValidPassword) return res.status(400).send({
            message: "Invalid Password"
        })

        const acessToken = user.generateAccessToken();
        return res.status(200).send({
            message: "User Logged In Successfully",
            token: acessToken
        })


    } catch (ex) {
        res.status(400).send({ message: ex.message || 'Something went wrong' })

    }

})

exports.getUser = asyncMiddleWare(async(req, res) => {
    try {

        const { email } = req.body
        if (!email) return res.status(400).send({ message: "Email doesn't exist." })

        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) return res.status(400).send({
            message: "Invalid Email"
        })

        // res.send(user)

    } catch (ex) {

        res.status(400).send({ message: ex.message || 'Something went wrong' })

    }
})


exports.forgotPassword = asyncMiddleWare(async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).send({ message: "Email doesn't exist." })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).send({ message: "Email doesn't exist.." })

        let getOtp = await Otp.findOne({ email })
        const randomOtp = otpGenerator()
        if (getOtp) {
            getOtp.otp = randomOtp
            await getOtp.save()
        } else {
            getOtp = new Otp({
                email,
                otp: randomOtp,
                resetToken: "123456",
                expiresIn: 0,
                createdAt: Date.now(),
            })
            await getOtp.save()

        }
        await sendEmail(email, 'Reset Password Verification', `<h3>Your Reset OTP is ${randomOtp}</h3>`)
        return res.send({ message: 'Otp sent to your email address' })
    } catch (ex) {
        res.status(400).send({ message: ex.message || 'Something went wrong' })
    }
})


exports.verifyOtp = asyncMiddleWare(async (req, res) => {

    try {

        const { otp } = req.body
        if (!otp) return res.status(400).send({ message: "Please Enter OTP" })

        let email = await Otp.findOne({ email: req.body.email })
        if (!email) res.status(400).send({ message: "Invalid OTP" })

        let getOtp = await Otp.findOne({ otp: req.body.otp })
        // console.log(getOtp)
        if (!getOtp) res.status(400).send({ message: "Invalid OTP" })

        res.send('You are Directed to reset password page')

    } catch (ex) {
        res.status(400).send({ message: ex.message || 'Something went wrong' })
    }

})


exports.resetPassword = asyncMiddleWare(async(req, res) => {

    try {
        const { password } = req.body
        if (!password) return res.status(400).send({ message: "Enter Password" })

        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send({ message: "Invalid email" })


        user.password = passwordHash.generate(password)
        req.body.password = user.password

        await user.save()
        // res.send(user)

    } catch (ex) {
        res.status(400).send({ message: ex.message || 'Something went wrong' })

    }

})
