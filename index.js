const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");
connectToMongo();
const port = 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_LINK,
    methods: "GET,POST,PUT,DELETE",
    samesite: "none",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
