import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import Routes from "./src/routes/index.js";
import cors from "cors";
import db from "./config/database.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

//cors
app.use(cors({ credentials: true, origin: true }));

//dotenv
config();

app.use(Routes);

app.use("/profiles", express.static("uploads/profiles"));

// page not found middleware
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// Internal server error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
