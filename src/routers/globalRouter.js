import express from "express";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  search,
  githubAuthStart,
  githubAuthEnd,
} from "../controllers/globalController";
import { privateMiddleware, publicMiddleware } from "../middlewares";

const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.route("/join").all(publicMiddleware).get(getJoin).post(postJoin);
globalRouter
  .route("/login")
  .all(publicMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get("/logout", privateMiddleware, logout);
globalRouter.get("/search", search);

export default globalRouter;
