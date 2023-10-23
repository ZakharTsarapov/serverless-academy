#!/usr/bin/env node

import { createInterface } from "readline"
import sortFunctions from "./sortFunctions.js";

const readline = createInterface({input: process.stdin, output: process.stdout});
const prompt = (query) => new Promise((resolve) => readline.question(query, resolve));


(async () => {
    try {
        while (true) {
            const words = await prompt("Hello. Enter  2-12 words or numbers them in spaces: ");

            if (!words.trim()) {
                readline.write("Please enter at least one symbol \n")
                continue
            }
            const arr = words.split(" ")
            if (words === "exit") {
                break
            }
            if (arr.length < 2) {
                readline.write("Please enter more words or numbers \n")
                continue
            }
            if (arr.length > 12) {
                readline.write("No more than 12 words or numbers \n")
                continue
            }
            const operation = await prompt(
                `Please type number from 1 to 6 or exit to choose an operation
                1.Sort words alphabetically
                2.Show numbers from lesser to greater
                3.Show numbers from bigger to smaller
                4.Display words in ascending order by number of letters in the word
                5.Show only unique words
                6.Display only unique values from the set of words and numbers entered by the user
                exit.To exit the program, the user need to enter exit, otherwise the program will repeat itself again and again, asking for new data and suggesting sorting `
            );
            switch (operation) {
                case "1":
                    console.log(sortFunctions.getSortedAlphabetically(arr));
                    break;
                case "2": {
                    console.log(sortFunctions.getNumbersFromLesserToGreater(arr))
                    break;
                }
                case "3": {
                    console.log(sortFunctions.getNumbersFromBiggerToSmaller(arr))
                    break;
                }
                case "4": {
                    console.log(sortFunctions.getWordsAscendingByNumbersOfLetter(arr))
                    break;
                }
                case "5": {
                    console.log(sortFunctions.getUniqueWords(arr))
                    break;
                }
                case "6": {
                    console.log(sortFunctions.getUniqueValuesOfWordsAndNumbers(arr))
                    break;
                }
                case "exit":
                    readline.close();
                    return;
                default:
                    console.log(`Cannot find command ${operation}`)
            }
        }
        readline.close();
    } catch (err) {
        console.error("Unable to prompt", err);
    }
})();

readline.on('close', () => process.exit(0));