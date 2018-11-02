const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

app.use(express.static("public"));

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport config
require("./config/passport")(passport);

//Passport middleware
app.use(passport.initialize());

app.set("view engine", "ejs");

const client = require("./routes/api/client");

//clean up process every week
var findRemoveSync = require("find-remove");
findRemoveSync(__dirname + "/public/processedImages", {
  age: { seconds: 604800 }
});

app.get("/", (req, res) => {
  res.render("test");
  //res.send("Welcome to Q-Eye!! What are you doing here?");
});

const port = process.env.PORT || 3000;

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

app.use("/api/client", client);

app.listen(port, () => console.log("Server running on port" + port));
