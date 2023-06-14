const express = require("express");
const db = require("./config/connection");
const cookieParser = require('cookie-parser')
const { errorhandler, routeNotFound } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/event", eventRoutes); 
app.use("/api/user", userRoutes);
app.all("*", routeNotFound);
app.use(errorhandler);
app.listen(3131, () => {
  console.log("APP IS RUNNING on 3131 PORT");
});
