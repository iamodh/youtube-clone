import "dotenv/config";

// MongoDB
import "./db";
import "./models/User";

// Dependencies
import express from "express";
import morgan from "morgan";
import session from "express-session";
import Mongostore from "connect-mongo";

// Middlewares
import { localsMiddleware } from "./middlewares";

// Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: Mongostore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(logger);
app.use(localsMiddleware);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
