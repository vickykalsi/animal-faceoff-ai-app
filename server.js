import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index");
})

app.post("/outcome", async (req, res) => {
  let outcome;
  async function analyze() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${req.body.animal1} vs ${req.body.animal2} in a fight outcome in less than 150 words`,
    });
    outcome = response.text;
  }
  await analyze();
  res.render("index", { outcome });
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
})