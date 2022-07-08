const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDatabase = require("./startUp/initDatabase");

const PORT = config.get("port") ?? 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  console.log(chalk.bgGreen("Production"));
} else {
  console.log(chalk.bgYellow("Development"));
}

const start = async () => {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.bgBlue("Connect DB"));
    app.listen(PORT, () => {
      console.log(chalk.bgBlue(`Server started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.bgRgb(error.message));
  }
};

start();
