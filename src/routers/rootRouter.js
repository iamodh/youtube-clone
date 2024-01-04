import express from "express";
import { join, login, logout } from "../controllers/userControllers";
import { home, search } from "../controllers/videoControllers";

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.get("/join", join);
rootRouter.get("/login", login);
rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;
