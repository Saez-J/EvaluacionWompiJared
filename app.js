import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import clientsRoute from "./routes/clientsRoute.js"
import adminsRoute from "./routes/adminsRoute.js"
import wompiRoute from "./routes/wompiRoute.js"
import ticketRoute from "./routes/ticketsRoute.js"


const app = express();

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());

app.use("/api/clients", clientsRoute);
app.use("/api/admins", adminsRoute);
app.use("/api/wompi", wompiRoute);
app.use("/api/tickets", ticketRoute);


export default app