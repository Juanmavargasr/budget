const express = require("express");
const userRouter = require("./routes/usersRoutes");
require("dotenv").config();

const app = express();
// const port = process.env.SECRET_PORT;
const port = 3008;
app.use(express.json());

app.use("/users", userRouter);

app.use("/sources", (req, res) => {
  res.status(200).send("AQUÍ VA LÓGICA");
});

app.use("/earnings", (req, res) => {
  res.status(200).send("AQUÍ VA LÓGICA");
});

app.use("/expenses", (req, res) => {
  res.status(200).send("AQUÍ VA LÓGICA");
});

app.listen(port, () => {
  console.log("Servidor levantado y corriendo en el puerto", port);
});
