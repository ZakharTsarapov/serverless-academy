import { Command } from "commander";
import TelegramBot from "node-telegram-bot-api";

const program = new Command();
const token = "6630033932:AAEhL-gfN0sIEES5_dOfDQ14SSwINKpG5DM";

const bot = new TelegramBot(token, { polling: false });

bot.on('message', msg => {
    const {chat: {id}} = msg
    bot.sendMessage(id, "pong")
})



program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("send-message")
  .alias("m")
  .description("send message to bot")
  .argument("<string>", "your message")
  .action((str) => {
    bot.sendMessage(560142779, str);
  });

program
.command("send-photo")
.alias("p")
.description("send photo to bot")
.argument("<photo>", "your photo")
.action((photo) => {
    bot.sendPhoto(560142779, photo)
})

  program.parse();  