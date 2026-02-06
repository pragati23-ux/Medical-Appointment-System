import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const register = async (req, res) => {
    let { name, email, password, role, gender, photo } = req.body
    // Normalize values to lowercase
    role = role?.toLowerCase()
    gender = gender?.toLowerCase()
    
    try {
        let user = null
        if (role === 'patient') user = await User.findOne({ email })
        else if (role === 'doctor') user = await Doctor.findOne({ email })

        // check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashpassword,
                photo,
                gender,
                role,
            })
        } else if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashpassword,
                photo,
                gender,
                role,
            })
        } else {
            return res.status(400).json({ message: 'Invalid role' })
        }

        await user.save()
        return res.status(201).json({ success: true, message: 'User created' })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message })
    }
}
export const login = async(req,res) => {
    try {
        let { email, password } = req.body

        let user = null
         const patient = await User.findOne({ email })
        const doctor = await Doctor.findOne({ email })
        if(patient)
            user=patient;
        if(doctor)
            user=doctor;

        if (!user) {
            console.log('User not found for email:', email, 'with role:', role)
            return res.status(404).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

        const payload = { id: user._id, role: user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' })

        return res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, id: user._id, name: user.name, email: user.email, role: user.role, photo: user.photo, phone: user.phone, gender: user.gender, bloodType: user.bloodType },
        })
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message })
    }
}