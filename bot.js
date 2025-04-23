const TelegramBot = require('node-telegram-bot-api');
const path = require('path'); // Добавляем модуль path для работы с файлами

require('dotenv').config();
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// ✅ /start command with local image
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Путь к локальному файлу
  const photoPath = path.join(__dirname, 'logo.png');

  // Отправляем картинку
  bot.sendPhoto(chatId, photoPath, {
    caption: `👋 *Welcome to Match Tracker!* ⚽\n\n` +
      `Track your favorite football matches in *real-time* right here in Telegram! 📊\n\n` +
      `👇 Tap the button below to get started:`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        {
          text: '📲 Open Match Tracker',
          web_app: {
            url: 'https://fizz1eout.github.io/MatchTracker/#/'
          }
        }
      ]]
    }
  });
});

// ℹ️ /help command with styled text
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `📖 *Available Commands* 📜\n\n` +
    `🔹 /start – Launch the bot 🚀\n` +
    `🔹 /help – Show this help message ℹ️\n` +
    `🔹 /about – Learn more about the project 📋`, {
    parse_mode: 'Markdown'
  });
});

// 🧾 /about command with styled text
bot.onText(/\/about/, (msg) => {
  bot.sendMessage(msg.chat.id, `🤖 *About Match Tracker Bot* ⚽\n\n` +
    `Follow your favorite football matches in *real-time* through a simple web app – all inside Telegram! 🌟\n\n` +
    `💻 *Developer*: @Fizzleout`, {
    parse_mode: 'Markdown'
  });
});

// 💬 Handle data from Web App (if needed)
bot.on('message', (msg) => {
  if (msg.web_app_data) {
    const data = msg.web_app_data.data;
    bot.sendMessage(msg.chat.id, `📩 Received data from the web app:\n${data}`);
  }
});

// Обработчик ошибок для polling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});