const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);

app.get("/", (req, res) => {
  res.send("Welcome to the CROSSFIT API");
});

app.post("/message", (req, res) => {
  const response = openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.body.message }],
  });

  response
    .then(async (data) => {
      let messageObj = data.data.choices[0].message.content;
      const a = messageObj;
      a.split(":");

      // Write "Awesome!"
      ctx.font = "30px Impact";
      ctx.rotate(0.1);
      ctx.fillText("Gautam khatri", 50, 100);

      // Draw line under text
      var text = ctx.measureText("gautam khatri");
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.beginPath();
      ctx.lineTo(50, 102);
      ctx.lineTo(50 + text.width, 102);
      ctx.stroke();

        console.log('<img src="' + canvas.toDataURL() + '" />');
    

      // fs.writeFileSync('gautam.png', text2png(a, {color: 'white'}));

      res.send({ message: a });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
