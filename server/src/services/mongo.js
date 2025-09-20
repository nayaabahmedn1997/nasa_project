const mongoose = require('mongoose');

const MONGO_URL = "mongodb://localhost:27017/";
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
})
mongoose.connection.on('error', (error) => {
    console.log(`Error MongoDB: ${error}`);
})

const connectMongoDB = async () => await mongoose.connect(MONGO_URL);


const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

module.exports = { connectMongoDB, mongoDisconnect };