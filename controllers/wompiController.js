import fetch from "node-fetch";
import { config } from "../config.js";

const wompiController = {};

wompiController.generarToken = async (req, res) => {
  try {
    const response = await fetch("https://id.wompi.sv/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: process.env.GRANT_TYPE,
        audience: process.env.AUDIENCE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
    });

    if (!response) {
        const error = await response.text();
        return res.statuts(500).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

wompiController.paymentTest = async (req, res) => {
    try {
        const {token, formData} = req.body;

        const response = await fetch(
        "https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        },
    );

    if (!response){
     const error = await response.text();
     return res.status(500).json({ error })   
    }

    const data = await response.json();
    return res.status(200).json(data);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default wompiController;
