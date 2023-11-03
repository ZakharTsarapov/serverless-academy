#!/usr/bin/env node

import TelegramBot from "node-telegram-bot-api";
import { program } from "commander";
import axios from "axios";
import { WEATHER_BOT_TOKEN, API_KEY, USER_ID } from "./config.js";

const token = WEATHER_BOT_TOKEN.trim();
const bot = new TelegramBot(token, { polling: true });

const weatherCity = (userCity) =>
  `http://api.openweathermap.org/data/2.5/forecast?q=${userCity}&cnt=5&appid=${API_KEY}&units=metric`;
async function getWeather(userCity) {
  const city = weatherCity(userCity);
  const fetchedData = await axios.get(city);
  const {
    city: { name },
  } = fetchedData.data;
  const forecast = fetchedData.data.list.map((el) => {
    const { weather, main, wind, dt_txt } = el;
    const time = new Date(dt_txt);
    const template = `${time.toLocaleString()}
                  ${name} forecast:
                  Weather: ${weather[0].main},
                  Temperature: ${main.temp}°C,
                  Feels like: ${main.feels_like}°C,
                  Humidity: ${main.humidity}%,
                  Wind: ${wind.speed} m/s
    `;

    return template;
  });

  return forecast;
}

program
  .command("start")
  .description("Start the bot")
  .action(() => {
    const chatId = USER_ID;
    bot.sendMessage(chatId, "Hello!");
  });

program
  .command("help")
  .description("Show help")
  .action(() => {
    const chatId = USER_ID;
    bot.sendMessage(
      chatId,
      "Commands:\n/start - Start the bot\n/help - Show help\n/weather <city> - Show the weather for required city"
    );
  });

program
  .command("weather <text>")
  .description("Enter city name")
  .action(
    async (userCity) => {
      const chatId = USER_ID;
      const weatherForeCast = await getWeather(userCity);
      bot.sendMessage(chatId, "How long forecast would you wish?", {
        reply_markup: {
          keyboard: [["3 hours"], ["6 hours"]],
        },
      }),
        bot.on("message", (msg) => {
          const three = "3 hours";
          if (msg.text.toString().toLowerCase() === three) {
            bot.sendMessage(chatId, weatherForeCast.join(""));
          }
          const six = "6 hours";
          if (msg.text.toString().toLowerCase() === six) {
            bot.sendMessage(
              chatId,
              weatherForeCast.filter((el, index) => index % 2 === 0).join("")
            );
          }
        });
    },
    (error) => {
      console.log("error", error);
      bot.sendMessage(chatId, "Something went wrong, try again later", {
        parse_mode: "HTML",
      });
    }
  );

program.parse(process.argv);

bot.on("message", (msg) => {
  console.log(`Received message: ${msg.text}`);
});
