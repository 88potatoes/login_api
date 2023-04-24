import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = "djfk>></pk3432jlkmsdslkm)-sdfj:ASLD<";

export async function handleRegister(req, res) {
    const { username, password } = req.body;

    User.find({username})
    .then(async function(result) {

        if (result.length != 0) {
            res.json({msg: "username already exists"});
            return;
        }
        
        /* new username => store onto database */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, password: hashedPassword});
        try {
            const result = await newUser.save();
            
            res.json({username});
        } catch (error) {
            res.json(error);
        }
    })
    .catch(error => {
        res.json({"error": error});
    });

};

export async function handleLogin(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});

        console.log(user);
        
        if (!user) {
            res.json({msg: "invalid username"});
            
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch);
        if (!isMatch) {
            res.json({msg: "wrong password"});
            return;
        }
        
        const token = jwt.sign({username, user_id: user._id}, secret)
        res.cookie("token", token).json({username});
    } catch (error) {
        res.json(error);
    }
};