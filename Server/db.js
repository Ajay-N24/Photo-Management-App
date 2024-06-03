const mongoose = require("mongoose");
const mongouri =
  "mongodb+srv://Ajayprmk:ajayprmk@cluster0.pap6tc8.mongodb.net/Photo-Management-App";
const mongodb = async () => {
  await mongoose
    .connect(mongouri)
    .then(async () => {
      console.log("Connected to Mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = mongodb;
