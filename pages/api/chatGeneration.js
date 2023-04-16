const { Configuration, OpenAIApi} =  require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function chatGenerate() {

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: generatePrompt("test")}]
  });
  console.log("completion: ", completion.data.choices[0].message.content)
  return completion.data.choices[0].message.content
}

function generatePrompt(prompt) {
  const capitalizedPrompt =
    prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  return `${capitalizedPrompt}.`;
}
module.exports = chatGenerate;