const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { model, messages } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: model || "gpt-3.5-turbo",
      messages,
    });

    res.status(200).json({
      message: completion.data.choices[0].message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
