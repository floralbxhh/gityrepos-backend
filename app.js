require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes
const usersRoutes = require("./routes/users");
const oauthRoutes = require("./routes/oauth");
const starredRoutes = require("./routes/starred");

const app = express();
const PORT = process.env.PORT || 3000;

//Connect to db
//If successful, listen to the defined port
mongoose
  .connect(process.env.ATLAS_DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(PORT))
  .catch((err) => console.error(err));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use 'users' routes
app.use("/api/users", usersRoutes);
app.use("/oauth", oauthRoutes);
app.use("/starred", starredRoutes);

//Handling undefined routes
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    message: "bad request",
  });
});

//Adding Express Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});
