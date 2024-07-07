require("dotenv").config();

const cors = require("cors");
const swaggerDocs = require("./swagger");

const bodyParser = require("body-parser");

let port = process.env.APP_PORT || "8000";
let host = process.env.APP_HOST || "localhost";

var express = require("express");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use('/uploads', express.static('uploads'));

const routes = require("./routes");
routes(app, "/");

swaggerDocs.swagger(app);

app.get("/", (req, res) => {
  res.render("welcome", {
    text: "Akses sistem Backend Manajemen Inventaris PT. Telkom Witel Magelang",
  });
});

app.listen(port, () => {
  console.log(`listening on http://${host}:${port}`);
});
