import { Configuration } from "openai"


export const ConfigureOpenAI = () => {
    const config = new Configuration({
        organization: process.env.OPEN_AI_ORGANISATION_ID,
        apiKey: process.env.OPEN_AI_SECRET,
    });
    return config;
}