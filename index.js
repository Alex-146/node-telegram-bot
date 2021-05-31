
// https://www.youtube.com/watch?v=slcqnHIFrj8

const getRates = require("./exchange");

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: "Qiwi", callback_data: "qiwi"}],
      [{text: "Yandex", callback_data: "yandex"}]
    ]
  })
};

const botCommands = [
  {
    "command": "/start",
    "description": "start command"
  }, 
  {
    "command": "/info",
    "description": "info command"
  },
  {
    "command": "/parse",
    "description": "parse command"
  }
];

const TelegramApi = require("node-telegram-bot-api");

const token = process.env.NODE_ENV === "production" ? 
  process.env.BOT_TOKEN : require("./botconfig").BOT_TOKEN;

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands(botCommands);

bot.on("message", onMessageReceived);

bot.on("callback_query", onButtonCallback);

async function onButtonCallback(response) {
  const { data, message } = response;

  const text = await getRates(data);
  await bot.sendMessage(message.chat.id, text);
}

async function onMessageReceived(message) {
  const {text, chat} = message;

  if (text === "/info") {
    await bot.sendMessage(chat.id, JSON.stringify(message));
  }
  else if (text === "/parse") {
    await bot.sendMessage(chat.id, "🥒", options);
  }
  else {
    await bot.sendMessage(chat.id, `Value: ${text} 😎👍`);
  }
}
