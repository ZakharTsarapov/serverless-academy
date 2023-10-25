import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { EXCHANGE_BOT, USER_ID } from "./config.js"

const token = EXCHANGE_BOT
const bot = new TelegramBot(token, {polling: true})

const currency = () => {
    'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11'
}

async function getCurrency() {
    const curr = currency() 
        const fetchedData = await axios.get(curr)
        const cours = fetchedData.data.map((el) => {
            const { ccy, base_ccy, buy, sale} = el
            const template = `${ccy} currency rate to ${base_ccy}:
                  Buy: ${buy},
                  Sale: ${sale},`;

        return template;
        })
        return cours;
    }
