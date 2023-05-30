require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const runPrompt = async () => {
  const prompt = "Tell me a joke about a cat eating pasta.";
  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    //model: "gpt-3.5-turbo",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 100,
  });

  console.log(response.data.choices[0].text);
}

runPrompt();