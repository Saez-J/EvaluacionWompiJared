import express from "express";
import loginAdminsController from "../controllers/loginAdminsController.js"
import registerAdminsController from "../controllers/registerAdminsController.js"

const router = express.Router();
//Login
router.route("/login").post(loginAdminsController.login);
//Register
router.route("/").post(registerAdminsController.register);
router.route("/verifyCodeEmail").post(registerAdminsController.verifyCode);

export default router;