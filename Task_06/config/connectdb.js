import mongoose from "mongoose";


const connectDB = async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbName: "PracticeMongoDB"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("Connected Successfylly...")
    } catch (error) {
        console.log(error)
    }
}


export default connectDB