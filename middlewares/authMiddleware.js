import jsonwebtoken from "jsonwebtoken"
import {config} from "../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try{
            const { AuthCookie } = req.cookies;
            if(!AuthCookie){
                return res.status(403).json({message: "No cookie Found, Authorization required"})
            }

            const decoded = jsonwebtoken.verify(AuthCookie, config.JWT.secret)

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Access denied"})
            }

            next()
        } catch (error) {
            console.log("error " + error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
};

export default validateAuthCookie;