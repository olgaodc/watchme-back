const uniqid = require('uniqid'); 
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



module.exports.LOGIN = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if (!user) {
            return res.status(401).json({response: "User does not exist"});
        }

        bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
            if (isPasswordMatch) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, process.env.JWT_SECRET, {expiresIn: '2h'}, {algorithm: "RS256"});
                return res.status(200).json({response: "You logged in", jwt: token});
            } else {
                return res.status(401).json({response: "Bad data"});
            }
        })
        
    } catch (err) {
        console.log("Err:", err);
        res.status(500).json({response: "Error, please try again"});
    }
}


module.exports.ADD_USER = async (req, res) => {
    try {       
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                const user = new UserModel({
                    name: req.body.name,
                    surname: req.body.surname,
                    password: hash,
                    email: req.body.email,
                    id: uniqid(),
                    userMovies: [],
                });

                await user.save();
            })
        })

        res.status(200).json({user: "User was saved successfully"});
    } catch (err) {
        res.status(500).json({user: "User is not saved, please try again"});
    }
}


module.exports.GET_ALL_USERS = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({users: users});
    } catch (err) {
        console.log("Err:", err);
        res.status(500).json({response: "Error, please try again"});
    }   
}


module.exports.GET_USER = async (req, res) => {
    try {
        const user = await UserModel.findOne({id: req.params.id});
        res.status(200).json({user: user});
    } catch (err) {
        console.log("Err:", err);
        res.status(500).json({response: "Error, please try again"});
    }
}


module.exports.DELETE_USER = async (req, res) => {
    try {
        const user = await UserModel.deleteOne({id: req.params.id});
        res.status(200).json({user: user});
    } catch (err) {
        console.log("Err:", err);
        res.status(500).json({response: "Error, please try again"});
    }
}