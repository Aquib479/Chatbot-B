import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { ConfigureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";


// generate a chat from chatgpt API
export const GenerateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }

        // take the chats of user 
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        // // sent all chats with new one to OpenAI API
        const config = ConfigureOpenAI();
        const openai = new OpenAIApi(config);
        // const response = await openai.listEngines();
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });

        // get latest response from the OpenAI API
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

// get all the chats of user !!
export const GenerateAllChatOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

// delete all the conversation of user with the AI-bot !!
export const DeleteAllConversationWithBot = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}