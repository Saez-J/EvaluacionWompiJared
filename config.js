import dotenv from "dotenv";

dotenv.config();

export const config = {
    JWT: {
        secret: process.env.JWT_Secret_key,
    },
    email: {
        user_email: process.env.SENDER_EMAIL,
        user_password: process.env.SENDER_PASSWORD
    },
    wompi: {
        grant_type: process.env.GRANT_TYPE,
        audience: process.env.AUDIENCE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    },
    PORT: {
        PORT: process.env.PORT
    }
};