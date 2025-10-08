require('dotenv').config();
const express = require('express');
const telegram = require('./helper/telegram');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Webhook endpoint
app.post("/webhook", async (req, res) => {
    const body = req.body;

    // 1. Normal message
    if (body.message) {
        const msg = body.message;
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        console.log(`Incoming message: ${text}`);

        if (text === "/start") {
            await telegram.sendMessage(chatId, "👋 Hello! I'm BaseBot. Type /help for help.");
        } else if (text === "/help") {
            await telegram.sendMessage(chatId, "📖 Commands:\n/start - Start\n/help - Help\n/format - " +
                "Formatted Text Message\n/img - Image with text\n/keyboard - Keyboard\n/inline_keyboard - Inline Keyboard");
        } else if (text === "/format") {
            await telegram.sendMessage(chatId,
                "<b>Bold</b> <i>Italic</i> <a href='https://google.com'>Link</a> <code>inline code</code>",
                { parse_mode: "HTML" }
            );
        } else if (text === "/img") {
            await telegram.sendPhoto(chatId,
                "https://pbs.twimg.com/profile_images/1966633565988196352/OHLHd5Im_400x400.jpg",
                "Caption is here"
            );
        } else if (text === "/keyboard") {
            await telegram.sendMessage(chatId, "Seleect an option 👇", {
                reply_markup: {
                    keyboard: [
                        [{ text: "🚀 Start" }, { text: "ℹ️ Info" }],
                        [{ text: "❌ Cancel" }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        } else if (text === "/inline_keyboard") {
            await telegram.sendMessage(chatId, "Options:", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🌐 Website", url: "https://alvion.io" },
                            { text: "📊 Stats", callback_data: "stats" }
                        ],
                        [
                            { text: "⚙️ Settings", callback_data: "settings" }
                        ]
                    ]
                }
            });
        } else {
            await telegram.sendMessage(chatId, "❓ I didn't recognize the command. You can type /help.");
            console.log(`I didn't recognize the command: ${text}`);
        }
    }

    // 2. Inline keyboard callback
    if (body.callback_query) {
        const callback = body.callback_query;
        const chatId = callback.message.chat.id;
        const data = callback.data; //  "stats" or "settings" etc.

        console.log(`The button was pressed: ${data}`);

        // To turn off the loading spinner
        await telegram.answerCallbackQuery(callback.id, { text: "✅ Your selection has been taken" });

        if (data === "stats") {
            await telegram.sendMessage(chatId, "📊 Here are the statistics...");
        } else if (data === "settings") {
            await telegram.sendMessage(chatId, "⚙️ You can change the settings here.");
        }
    }

    console.log(body);
    res.sendStatus(200);
});


app.get("/test", (req, res) => {
    res.send("Hello 01").status(400);
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 BaseBot is running on port ${process.env.PORT}`);
    console.log(`Set webhook: https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=https://basebot.onrender.com/webhook`);
});