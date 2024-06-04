const mongoose = require("mongoose");
const mongouri =
  "your-Mongodb-URI";
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
