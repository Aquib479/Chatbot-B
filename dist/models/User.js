import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
// schema to create a new chat of user
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
// schema to create a new user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map