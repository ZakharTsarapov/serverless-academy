import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { EXCHANGE_BOT, USER_ID } from "./config.js";

const token = EXCHANGE_BOT;
const bot = new TelegramBot(token, { polling: true });
const chatId = USER_ID

const currency = () => 
  `https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11`;
async function getCurrency() {
    const curr = currency();
    const fetchedData = await axios.get(curr);
    const cours = fetchedData.data.map((el) => {
      const { ccy, base_ccy, buy, sale } = el;
      const template = `cours:${ccy} currency rate to ${base_ccy}:
                    Buy: ${buy},
                    Sale: ${sale},`;
  
      return template;
    });
    return cours;
  }



bot.onText(/\/start/, (msg) => {
  bot.sendMessage(chatId, "Welcome to the bot!");
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    chatId,
    "Available commands:\n/start - Start the bot\n/help - Show help\n/currency - Show the currency"
  );
});

bot.onText(
  /\/currency/,
  async () => {
    const fetchCurrency = await getCurrency;
    bot.sendMessage(chatId, "Choose a currency", {
      reply_markup: {
        keyboard: [["USD"], ["EUR"]],
      },
    });
    bot.on("message", (msg) => {
      const usd = "USD";
      if (msg.text.toString().toLowerCase() === usd) {
        bot.sendMessage(chatId, fetchCurrency[0]);
      }
    });
    bot.on("message", (msg) => {
      const eur = "EUR";
      if (msg.text.toString().toLowerCase() === eur) {
        bot.sendMessage(chatId, fetchCurrency[1]);
      }
    });
  },
  (error) => {
    console.log("error", error);
    bot.sendMessage(chatId, "Something went wrong", { parse_mode: "HTML" });
  }
);