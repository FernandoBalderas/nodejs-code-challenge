import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mainRouter from "./api/routes/mainRouter";

const app = express();

app.use(express.json());
app.use(morgan("short"));
app.use("/", mainRouter);
app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV == "development") {
    console.log(`Listening on http://localhost:${process.env.PORT}/`);
  }
});
