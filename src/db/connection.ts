import mongoose from 'mongoose';

// fucntion to connect to mongo DataBase 
async function connectToMongoDB() {
  const url = process.env.MONGODB_URL as string;

  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');

  } catch (error) {
    throw new Error("cannot connect to DataBase");
  }
}

// function to disconnect to mongo DataBase
async function disconnectToMongoDataBase(){
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Couldn't disconnect from data base");
    }
}

// Call the function to connect and disconnect to MongoDB
export {connectToMongoDB, disconnectToMongoDataBase};
