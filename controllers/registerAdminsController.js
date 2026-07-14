import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import adminsModel from "../models/adminsModel.js"
import { config } from "../config.js"
import { register } from "module"

const registerAdminController = {};

registerAdminController.register = async (req, res) => {
    try {
        const {name, email, password, isVerified} = req.body;
        
        const existAdmin = await adminsModel.findOne({email});

        if(existAdmin){
            return res.status(400).json({message: "Admin already exists"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10);
        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                randomCode,
                name,
                email,
                password: passwordHashed,
                isVerified,
            },
            config.JWT.secret,
            {expiresIn: "15min"},
        );

        res.cookie("registrationCookie", token, {maxAge: 15*60*1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion de Cuenta",
            text: "Para verificar tu cuenta, utiliza este codigo " + randomCode + " expira en 15 minutos"
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log("error");
                return res.status(500).json({message: "Error sending Mail"});
            }
            return res.status(200).json({message: "Email sent"});
        });
    } catch (error) {
        console.log("Error " + error);
        return res.status(500).json({message: "Intrenal Server Error"});
    }
};

registerAdminController.verifyCode = async (req, res) =>{
    try {
        const { verificationCodeRequest }= req.body;
        const token = req.cookies.registrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomCode: storedCode,
            name,
            email,
            password,
        } = decoded;

        if(verificationCodeRequest !== storedCode) {
            return res.status(400).json({message: "Invalid Code"});
        }

        const newAdmin = adminsModel({
            name,
            email,
            password,
            isVerified: true,
        });

        await newAdmin.save();

        res.clearCookie("registrationCookie");
        return res.status(200).json({message: "Admin registered"});

    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export default registerAdminController;

