import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/todoticket")

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("DB is connected")
});

connection.once("disconnected", ()=>{
    console.log("DB is disconnected")
});


connection.once("disconnected", ()=>{
    console.log("Error Found " + error)
});

 export default connection;