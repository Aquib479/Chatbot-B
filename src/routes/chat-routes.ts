import express from 'express';
const chatRoutes = express.Router();
import { AuthenticateUserToken } from '../utils/token-manager.js';
import { ChatValidators, validate } from '../utils/validators.js';
import { DeleteAllConversationWithBot, GenerateAllChatOfUser, GenerateChatCompletion } from '../controllers/chat-controllers.js';

// Protected API
chatRoutes.get('/all-chat', AuthenticateUserToken, GenerateAllChatOfUser);
chatRoutes.post('/new', validate(ChatValidators), AuthenticateUserToken, GenerateChatCompletion);
chatRoutes.delete('/delete', AuthenticateUserToken, DeleteAllConversationWithBot);

export default chatRoutes;