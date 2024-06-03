const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const bodyParser = require("body-parser");
const uploadImg = require("./routes/uploadImg");
app.use(bodyParser.urlencoded({ extended: true }));
const mongodb = require("./db");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  next();
});
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(uploadImg);
mongodb();
app.listen(process.env.PORTNO, () => {
  console.log(`Server Working on PORT Number ${process.env.PORTNO}`);
});
