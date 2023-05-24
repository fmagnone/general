/*
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion () {
  const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Greetings to a user",
  max_tokens:500
  });
  console.log(completion.data.choices[0].text);
}
runCompletion();
*/

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";

async function generateGreeting(name, greeting) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        prompt: `Greetings to ${name}: ${greeting}`,
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "Error generating greeting.";
  }
}

export default generateGreeting;
