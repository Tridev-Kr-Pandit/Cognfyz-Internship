const mongoose = require('mongoose')

const connectDb = async()=>{
    try{
        const con = await mongoose.connect('mongodb://localhost:27017/PracticeMongoDB');
        console.log('Database connected: ', con.connection.host, con.connection.name);
    }catch(err){
        console.log(err);
        process.exit();
    }
}

module.exports = connectDb;