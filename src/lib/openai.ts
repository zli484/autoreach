import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// export const llm = new OpenAI({
//   temperature: 0.9,
// });

export const chatModelGPT4 = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4-1106-preview",
});

export const chatModelGPT3P5 = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
});

export const embedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
