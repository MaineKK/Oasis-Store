const mongoose = require("mongoose");

const mongodbUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Final-Project";

mongoose
  .connect(mongodbUri)
  .then(() =>
    console.info(`Successfully connected to the database ${mongodbUri}`)
  )
  .catch((error) =>
    console.error(`An error trying to connect to the database ${mongodbUri}`)
  );
