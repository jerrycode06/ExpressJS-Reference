const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const Members = require("./Members");

const app = express();

//Init Middleware
// app.use(logger);

//Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   // res.send("<h1> Hello World!! </h1>");
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//Homepage Route with template engine
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members App",
    Members,
  })
);

//Set a static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API Routes
app.use("/api/members", require("./routes/api/members"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
