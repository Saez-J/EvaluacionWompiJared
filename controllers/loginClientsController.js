import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../config.js"
import clientsModel from "../models/clientsModel.js"

const loginClientsController = {};

loginClientsController.login = async (req, res) =>{
    try {
        const { email, password} = req.body;

        const clientFound = await clientsModel.findOne({ email})
        if (!clientFound){
            return res.status(400).json({message: "Customer not found"});
        }

        if (clientFound.timeOut && clientFound.timeOut> Date.now()){
            return res.status(403).json({message: "Account is blocked"});
        }

        const isMatch = await bcryptjs.compare(password, clientFound.password);
        if (!isMatch){
            clientFound.loginAttempts = (clientFound.failedLoginAttemps + 1)

            await clientFound.save();

            if (clientFound.loginAttempts >= 5){
                clientFound.timeOut = Date.now() + 5*60*1000;
            };
            
            await clientFound.save();

            return res.status(403).json({message: "Account is wrong password"});
        }

    clientFound.loginAttempts= 0;
    clientFound.timeOut= null;

    const token = jsonwebtoken.sign({id: clientFound.id, userType: "Client"},
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

export default loginClientsController;