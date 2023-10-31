import { readFileSync, writeFileSync } from "fs";

const data = readFileSync("data.json");
const vacations = JSON.parse(data);

const transformedData = [];

vacations.forEach((vacation) => {
  const { user, startDate, endDate } = vacation;
  const vacUser = transformedData.find((item) => item.userId === user._id);

  if (vacUser) {
    const newDate = { startDate: startDate, endDate: endDate };
    vacUser.vacations.push(newDate);
  } else {
    const newUser = {
      userId: user._id,
      userName: user.name,
      vacations: [
        {
          startDate,
          endDate,
        },
      ],
    }; transformedData.push(newUser)
  }
});

writeFileSync("vacation.json", JSON.stringify(transformedData), "utf-8")
