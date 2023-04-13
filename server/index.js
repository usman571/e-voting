const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const registerRouter = require("./routes/register");
const adminRegisterRouter = require("./routes/adminRegister");
const loginRouter = require("./routes/login");
const adminLoginRouter = require("./routes/adminLogin");

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database!");
});

app.use("/register", registerRouter);
app.use("/adminRegister", adminRegisterRouter);
app.use("/login", loginRouter);
app.use("/adminLogin", adminLoginRouter);

app.listen(PORT, () => {
  console.log("Server started on port 5000");
});
