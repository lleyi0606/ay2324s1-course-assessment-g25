const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const matchRouter = require("./routes/matchRouter");
app.use("/match", matchRouter);
const {errorHandler} = require("./middleware/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 8081;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});