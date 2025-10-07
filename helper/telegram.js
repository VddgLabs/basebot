const axios = require('axios');

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

const sendMessage = async (chatId, text, options = {}) => {
    return axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text,
        ...options,
    });
}

const sendPhoto = (chatId, photoUrl, caption = "") => {
    return axios.post(`${TELEGRAM_API}/sendPhoto`, {
        chat_id: chatId,
        photo: photoUrl,
        caption,
    });
}

const sendDocument = (chatId, fileUrl, caption = "") => {
    return axios.post(`${TELEGRAM_API}/sendDocument`, {
        chat_id: chatId,
        document: fileUrl,
        caption,
    });
}

module.exports = {
    sendMessage,
    sendPhoto,
    sendDocument
}