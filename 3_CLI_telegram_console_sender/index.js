import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";

const program = new Command();
const token = "6630033932:AAEhL-gfN0sIEES5_dOfDQ14SSwINKpG5DM";

const bot = new TelegramBot(token, { polling: true });
const chatId = msg.chat.id;

program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("send-message")
  .description("send message to bot")
  .argument("<string>", "your message")
  .action((str) => {
    bot.sendMessage(chatId, str);
  });
