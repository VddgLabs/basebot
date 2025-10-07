require('dotenv').config();
const express = require('express');
const telegram = require('helper/telegram');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Webhook endpoint
app.post("/webhook", async (req, res) => {
    const msg = req.body.message;
    if (!msg) return res.sendStatus(200);

    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    if (text === "/start") {
        await telegram.sendMessage(chatId, "👋 Hello! I'm BaseBot. Type /help for help.");
    } else if (text === "/help") {
        await telegram.sendMessage(chatId, "📖 Commands:\n/start - Start\n/help - Help");
    } else {
        await telegram.sendMessage(chatId, "❓ I didn't recognize the command. You can type /help.");
    }

    res.sendStatus(200);
});


app.get("/test", (req, res) => {
    res.send("Hello 01").status(400);
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 BaseBot is running on port ${process.env.PORT}`);
    console.log(`Set webhook: https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=https://localhost/webhook`);
});