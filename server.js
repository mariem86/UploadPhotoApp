const express = require("express");
const mongoose = require("mongoose");
const photosRouter = require("./routers/photo");

const app = express();

mongoose.connect("mongodb://localhost:27017/photo_galleryy", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//MiddleWares
app.use(express.json());
app.use("/api/photos", photosRouter);

//Server Start
const port = 5000;
app.listen(port, err => {
  err
    ? console.log(err)
    : console.log(`The Server is running on port ${port}...`);
});