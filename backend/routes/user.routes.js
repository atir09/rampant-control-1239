const express = require("express")
const mongoose = require("mongoose")
const { userModel } = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userRoute = express.Router()


////////////////////////////////........... User Signup..................//////////////////////////////////////////
userRoute.post("/register", async (req, res) => {
    const {name,email,password}=req.body
    try {
        const presentUser =await userModel.find({email:email})
        if (presentUser?.length >= 1) {
            res.json({ "msg": "User already exist, please login" })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    console.log(err)
                    res.send({ "msg": "Unable to Register New User" })
                } else {
                    const user = new userModel({ name, email, password: hash })
                    user.save()
                    res.json({ "msg": "User Registered Successfully" })
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.send({ "msg": "Unable to Register New User" })
    }
})


////////////////////////////////........... User log In..................//////////////////////////////////////////


userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user?.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userId: user[0]["_id"] }, process.env.jsonKey, { expiresIn: '24h' })
                    localStorage.setItem("token", token)
                    res.send({"msg":"Login Successful"})
                } else {
                    res.send({"msg":"Invalid Credentials"})
                }
            });
        } else {
            res.send({"msg":"Email Not Registered,Please Sign Up"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Unable to log in"})
    }
})




module.exports = { userRoute }