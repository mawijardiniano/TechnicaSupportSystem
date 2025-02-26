const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authenticationRouter = require("./routes/authenticationRoutes");
const problemRouter = require("./routes/problemRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error: ", err));

app.use("/api/authentication", authenticationRouter);
app.use("/api/report", problemRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
