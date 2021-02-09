const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')


require("dotenv").config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI ;
mongoose.connect('mongodb://localhost/Al-Estate', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully");
});

const homesRouter = require("./routes/home");
const usersRouter = require("./routes/users");
app.use("/homes", homesRouter);
app.use("/users", usersRouter);

// if(process.env.NODE_ENV ==='production'){
//   app.use(express.static('al-estate/build'))

//   app.use(express.static(path.join(__dirname, "../al-estate-a", "build")))

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../al-estate-a", "build", "index.html"));
// });
// }
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});