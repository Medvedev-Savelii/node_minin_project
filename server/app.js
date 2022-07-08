const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const PORT = config.get("port") ?? 5000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
