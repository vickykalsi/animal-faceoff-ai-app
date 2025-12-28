import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const animals = [];
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
let outcome;

app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("./index",{outcome});
})

app.post("/", async (req, res) => {
  async function analyze() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${req.body.animal1} vs ${req.body.animal2} in a fight outcome in less than 100 words`,
    });
    outcome=response.text;
  }
  await analyze();
  res.redirect("/");
})

app.listen(3000, () => {
  console.log("server is listening on port 3000");
})