require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGOURL;

const connectToMongo = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(mongoURI, (err) => {
    if (err) console.log(err);
    else console.log("MongoDB is Connected");
  });
};

module.exports = connectToMongo;
