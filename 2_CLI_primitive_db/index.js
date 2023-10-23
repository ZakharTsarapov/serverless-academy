#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";

const DB = "test.txt";
const addUsers = async () => {
  const EXIT = "";
  const user = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the user's name. To cancel press Enter: ",
    },
    {
      type: "list",
      name: "gender",
      message: "Choose your Gender: ",
      choices: ["male", "female"],
      when: (user) => {
        return user.name !== EXIT;
      },
    },
    {
      type: "input",
      name: "age",
      message: "Enter your age: ",
      validate: function (input) {
        input = Number(input);
        if (Number.isNaN(input)) {
          return "You need to provide a number";
        }

        if (input < 18 || input > 60) {
          return "Age should be between 18-60";
        }
        return true;
      },
      when: (user) => {
        return user.name !== EXIT;
      },
    },
  ]);
  if (user.name === EXIT) {
    return null;
  } else {
    saveUsers(user);
    return addUsers();
  }
};
const saveUsers = (user) => fs.appendFileSync(DB, JSON.stringify(user) + "\n");
const searchUser = async () =>
  inquirer.prompt([
    {
      type: "confirm",
      name: "wantToSearch",
      message: "Would you to search User in DB? ",
    },
  ]);
const loadData = () => {
  const readFile = fs.readFileSync(DB, "utf-8");
  return readFile
    .split("\n")
    .filter((row) => row !== "")
    .map((row) => JSON.parse(row));
};
const getQuery = async () =>
  inquirer.prompt([
    {
      type: "input",
      name: "query",
      message: "Enter User`s name you wanna find in DB: ",
      validate: (input) => {
        if (input === "") {
          return "Please enter some text";
        }
        return true;
      },
    },
  ]);
const filterUsers = async () => {
  const allUsers = loadData();
  console.log(allUsers);
  const { query } = await getQuery();
  const filteredUsers = allUsers.filter(
    (user) => user.name.toLowerCase() === query.toLowerCase()
  );
  if (filteredUsers.length === 0) {
    console.log("User not found with name: ", query);
  } else {
    console.log(filteredUsers);
  }
};
const appStart = async () => {
  await addUsers();

  const { wantToSearch } = await searchUser();
  if (!wantToSearch) {
    return;
  }
  await filterUsers();
};
appStart().then(() => process.exit(0));
