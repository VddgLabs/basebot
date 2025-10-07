const axios = require('axios');

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendMessage(chatId, text, options = {}) {
    return axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text,
        ...options,
    });
}

export async function sendPhoto(chatId, photoUrl, caption = "") {
    return axios.post(`${TELEGRAM_API}/sendPhoto`, {
        chat_id: chatId,
        photo: photoUrl,
        caption,
    });
}

export async function sendDocument(chatId, fileUrl, caption = "") {
    return axios.post(`${TELEGRAM_API}/sendDocument`, {
        chat_id: chatId,
        document: fileUrl,
        caption,
    });
}