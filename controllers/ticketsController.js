import ticketModel from "../models/ticketsModel.js"

//array de funciones
const ticketsController = {};

//Insert
ticketsController.createTicket = async (req, res) => {
    try{
        const{total, paymentStatus, transactionId} = req.body;

        if(!total){
            return res.status(404).json({message:"El total es obligatorio"});
        }
        const newTicket = await ticketModel.findByIdAndUpdate({
            ticketId: req.user.id,
            total,
            paymentStatus:paymentStatus ||"Pending",
            transactionId: transactionId || null,
    });

    await newTicket.save();

    return res.status(201).json({message:"ticket registrado", ticket:newTicket});

    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

//Select consultar los tickets
ticketsController.getTicket = async(req, res) => {
    try{
        const ticket = await ticketModel.find();
        return res.status(200).json({ticket});
    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//Select de mis tickets
ticketsController.getMyTicket = async (req, res) => {
    try{
        const ticket = await ticketModel
        .find({ticketId:req.user.id})
        .sort({createdAt:-1});

        return res.status(200).json(ticket);
    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//Update de tickets
ticketsController.updateTicket = async(req, res) => {
    try{
        const ticket = await ticketModel.findById(
            req.params.id);

        if(!ticket){
            return res.status(404).json({message:"ticket not found"});
        }

        if(!req.user.role !== "admin" && ticket.ticketId.toString() !== req.user.id){
            return res.status(403).json({message:"Acceso denegado"});
        }

        const{amount, paymentStatus, transactionId} = req.body;

        const ticketUpdate = await ticketModel.findByIdAndUpdate(
            req.params.id,
            {amount,paymentStatus ,transactionId ,transactionId },
            {new:true}
    );
    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

//Delete ticket
ticketsController.deleteTicket = async (req, res) =>{
    try{
        const deleteTicket = await ticketModel.findByIdAndDelete
        (req.params.id);

        if(!deleteTicket){
            return res.status(404).json({message:"ticket Deleted"});
        }
    }catch(error){
        console.log("error" + error);
        return res.status(500).json({message:"Internal Server Error"});
    }
};

export default ticketsController;