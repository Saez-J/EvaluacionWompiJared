import app from "./app.js"
import database from "./database.js"

async function main(){
    const PORT = process.env.PORT || 4000
    app.listen(PORT)
    console.log("Server on port 4000")
}

main()