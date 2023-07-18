const express = require("express");
const userRouter = require("./routes/usersRoutes");
const sourceRouter = require("./routes/sourcesRoutes");
require("dotenv").config();

const app = express();
const port = process.env.SECRET_PORT;
app.use((req, res, next) => {
  try {
    const valideRequest = ["GET", "POST", "PUT", "DELETE"];
    const method = req.method.toUpperCase();
    if (!valideRequest.includes(method)) {
      return res.status(400).json({ error: "Not allowed method" });
    }
  } catch (error) {
    console.error("Error checking methods", error);
    res.status(500).json({ error: "Error checking methods" });
  }
  next();
});
app.use(express.json());

app.use("/users", userRouter);

app.use("/sources", sourceRouter);

app.use("/earnings", (req, res) => {
  res.status(200).send("AQUÍ VA LÓGICA");
});

app.use("/expenses", (req, res) => {
  res.status(200).send("AQUÍ VA LÓGICA");
});

app.listen(port, () => {
  console.log("Server running in port:", port);
});
