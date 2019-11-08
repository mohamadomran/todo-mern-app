const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const xssFilter = require("x-xss-protection");
require("dotenv").config();

// Bodyparser Middleware and xss prevention
app.use(express.json());
app.use(xssFilter());
app.use(xssFilter({ reportUri: "/report-xss-violation" }));
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes

app.use("/api/todos", require("./routes/api/todos"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
