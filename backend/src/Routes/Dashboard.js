require("dotenv").config();
const pool = require("../../Database/db.js");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch").default;
const si = require("systeminformation");
require("dotenv").config();

router.post("/ai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_TOKEN}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 1,
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API Error:", data.error);
      return res.status(500).json({
        error: data.error.message || "OpenAI returned an error",
      });
    }

    if (!data.choices || !data.choices.length) {
      console.error("Unexpected OpenAI response:", data);
      return res.status(500).json({
        error: "Invalid response from OpenAI API",
      });
    }

    const answer = data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

router.get("/cpu", async (req, res) => {
  const data = await si.cpu();
  res.json({ data });
});

module.exports = router;
