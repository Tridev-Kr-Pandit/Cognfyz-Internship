import UserModel from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.send({ "Status": "failed", "message": "Email already exists" })
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            tc: tc
                        })
                        await doc.save();

                        const saved_user = await UserModel.findOne({ email: email })
                        //Gernate JWT Token
                        const token = jwt.sign({ userId: saved_user._id },
                            process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                        res.status(201).send({ "Status": "success", "message": "Registration success", "token": token })
                    } catch (error) {
                        console.log(error)
                        res.send({ "Status": "failed", "message": "Unable to Register" })
                    }
                } else {
                    res.send({ "Status": "failed", "message": "Password doe't match" })
                }
            } else {
                res.send({ "Status": "failed", "message": "All fields are required" })

            }
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        // Gernate JWT Token
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                        res.send({ "Status": "success", "message": "Login Successfully...", "token": token })
                    } else {
                        res.send({ "Status": "failed", "message": "Email or password is not Valid" })
                    }
                } else {
                    res.send({ "Status": "failed", "message": "You are not a Registered User" })
                }
            } else {
                res.send({ "Status": "failed", "message": "All fields are required" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static changeUserPassword = async (req, res) => {
        const { password, password_confirmation } = req.body;
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "Status": "failed", "message": "password does not match"})
            }else{
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(password, salt);
                // console.log(req.user._id);
                await UserModel.findByIdAndUpdate(req.user._id, {$set: {password: newHashPassword}});
                res.send({ "Status": "success", "message": "Password change Successfully..."});
            }
        } else {
            res.send({ "Status": "failed", "message": "All fields are required" });
        }
    }

    static loggedUser = async(req,res)=>{
        res.send({"user": req.user})
    }

}


export default UserController;