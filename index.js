const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./routes/routes.js");
// const objectId = require("mongodb").ObjectID;
// const MongoClient = require("mongodb").MongoClient;
const app = express();
const jsonParser = express.json();
const StaffController = require("./controllers/staff.js");

function setupCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
}

// const LOCAL_URL = "mongodb://localhost:27017/";
// const MONGODB_URI = "mongodb+srv://crm-cafe.cm207ma.mongodb.net/";
// const LOCAL_URL = "mongodb+srv://sardarbekatabekov:<password>@crm-cafe.cm207ma.mongodb.net/";
const MONGODB_URI = 'mongodb+srv://sardarbekatabekov:YI3AhX4xpR9qxEpM@crm-cafe.cm207ma.mongodb.net/?retryWrites=true&w=majority&appName=CRM-cafe'
// mongodb+srv://sardarbekatabekov:<password>@crm-cafe.cm207ma.mongodb.net/
// mongosh "mongodb+srv://crm-cafe.cm207ma.mongodb.net/" --apiVersion 1 --username sardarbekatabekov
// let dbClient;

app.use(setupCORS);
app.use("/public", express.static(__dirname + "/public"));
// index.use("/uploads", express.static(__dirname + "/uploads"));

// mongoClient.connect(function (err, client) {
//   if (err) return console.log(err);
//   dbClient = client;
//   app.locals.collection = client.db("usersdb").collection("users");
//   app.listen(5000, function () {
//     console.log("Сервер ожидает подключения...");
//   });
// });

app.use("/api", Routes);


const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      dbName: "userdb",
    });
    app.listen(PORT, () => console.log(`We started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
