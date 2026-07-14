import express from "express";
import ticketsController from "../controllers/ticketsController.js"
import validateAuthCookie from "../middlewares/authMiddleware.js"

const router = express.Router();
router.route("/").get(validateAuthCookie(["Admin"]),ticketsController.getTicket);
router.route("/myTickets").get(ticketsController.getMyTicket)
router.route("/").post(validateAuthCookie(["client"]), ticketsController.createTicket);
router.route("/updateTicket").put(validateAuthCookie(["Admin", "client"]), ticketsController.updateTicket);
router.route("/deleteTicket").delete(validateAuthCookie(["Admin"]), ticketsController.deleteTicket)

export default router;