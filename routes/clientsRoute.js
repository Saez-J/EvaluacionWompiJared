import express from "express";
import loginClientsController from "../controllers/loginClientsController.js"
import registerClientsController from "../controllers/registerClientsController.js"

const router = express.Router();
//Login
router.route("/login").post(loginClientsController.login);
//Register
router.route("/").post(registerClientsController.register);
router.route("/verifyCodeEmail").post(registerClientsController.verifyCode);

export default router;