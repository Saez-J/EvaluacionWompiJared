import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../config.js"
import adminsModel from "../models/adminsModel.js"

const loginAdminsController = {};

loginAdminsController.login = async (req, res) =>{
    try {
        const { email, password} = req.body;

        const adminFound = await adminsModel.findOne({ email})
        if (!adminFound){
            return res.status(400).json({message: "Customer not found"});
        }

        if (adminFound.timeOut && adminFound.timeOut> Date.now()){
            return res.status(403).json({message: "Account is blocked"});
        }

        const isMatch = await bcryptjs.compare(password, adminFound.password);
        if (!isMatch){
            adminFound.loginAttempts = (adminFound.failedLoginAttemps + 1)

            await adminFound.save();

            if (adminFound.loginAttempts >= 5){
                adminFound.timeOut = Date.now() + 5*60*1000;
            };
            
            await adminFound.save();

            return res.status(403).json({message: "Account is wrong password"});
        }

    adminFound.loginAttempts= 0;
    adminFound.timeOut= null;

    const token = jsonwebtoken.sign({id: adminFound.id, userType: "Admin"},
        config.JWT.secret,
        {expiresIn: "30d"}
    );

    res.cookie("AuthCookie", token)

    return res.status(200).json({message: "Login succesfull", token});

    } catch (error) {
        console.log("Error en el Login " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export default loginAdminsController;