// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const uri = process.env.MONGO_URI;
// // const uri =
// //   "mongodb+srv://juanmavargasr2:kdaSVteJMVTc52Ha@lukaapp.hmskvbj.mongodb.net/";
// const client = new MongoClient(uri);

// const dbName = "Luka";

// const connect = async () => {
//   try {
//     await client.connect();
//     console.log("Connecting to database");
//   } catch (error) {
//     console.error("error:", error);
//   }
//   return client.db(dbName);
// };

// const db = connect();

// module.exports = db;

const mongoose = require("mongoose");

// URL de conexión a la base de datos MongoDB
const dbUrl =
  "mongodb+srv://juanmavargasr2:kdaSVteJMVTc52Ha@lukaapp.hmskvbj.mongodb.net/";

// Opciones de configuración para la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Luka",
};

// Conectar a la base de datos
mongoose
  .connect(dbUrl, options)
  .then(() => {
    console.log("Succesfully databases conection");
  })
  .catch((error) => {
    console.error("Databases couldn't be connected", error);
  });
