import mongoose from "mongoose";
let connected: boolean = false;
export async function connectDB() {
    mongoose.set("strictQuery", false);

    if(connected) {
        console.log("MongoDB already connected");
        return;
    }

    const mongoUri: string | undefined = 'mongodb://127.0.0.1:27017/mongoose-app';

    if(!mongoUri) {
        console.log("MongoDB URI not found");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        connected = true;
        console.log("MongoDB connected...");
    } catch (err) {
        console.log(err);
    }
}