import { connect, connections } from "mongoose";

export async function connectDb() {
    if(!connections[0].readyState) {
        console.log(process.env.MONGO_DB_URL);
        await connect(process.env.MONGO_DB_URL)
    }
}