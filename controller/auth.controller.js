const Auth = require("../model/auth.model")
const bcrypt = require("bcryptjs")
const senEmail = require("../utils/send-email")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  const {username, email, password} = req.body

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "username, email, password are required"
    })
  }

const user = await Auth.findOne({email})
if (user) {
  return res.status(400).json({
    message: "Foydalanuvchi allaqachon mavjud"
  })
}


const randomNumber = Array.from({length: 6}, () => (Math.round() * 6)).join("")
await Auth.create({
  username,
  email,
  password: await bcrypt.hash(String(password), 10),
  otp: randomNumber,
  otpTime: Date.now() + 120000
})
await senEmail(randomNumber, email)

res.status(201).json({
  message: "Registered"
})
}

const verify = async (req, res) => {
  const {email, code} = req.body

  const user = await Auth.findOne({email})

if (!user) {
  return res.status(400).json({
    message: "Foydalanuvchi topilmadi"
  })
}
if(user.otp !== code || user.otpTime > Date.now()) {
  return res.status(400).json({message: "Kod xato yoki eskirgan"})
}

const payload = {id: user._id, email: user.email, role:  user.role}
const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "10d"})
}

module.exports = {
  register
}