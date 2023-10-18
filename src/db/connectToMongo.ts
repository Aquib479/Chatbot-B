import { connect } from 'mongoose';


async function connectToMongo() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        throw new Error("cannot connect to database");
    }
}
