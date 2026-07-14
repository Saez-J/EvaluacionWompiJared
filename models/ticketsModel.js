import { Schema, model } from "mongoose"

const ticketsSchema = new Schema({
    adminId: { ObjectId: String},
    quantity: { type: Number},
    purchaseDate: { type: Date},
    total: { type: Number},
    paymentStatus: { type: Boolean},
    transactionId: { type: String}
}, {
    timestamps: true,
    strict: false
})

export default model("Tickets", ticketsSchema)