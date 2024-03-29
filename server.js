const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
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
