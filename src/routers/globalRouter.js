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
  kakaoAuthStart,
  kakaoAuthEnd,
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

globalRouter.get("/github/auth/start", publicMiddleware, githubAuthStart);
globalRouter.get("/github/auth/end", publicMiddleware, githubAuthEnd);
globalRouter.get("/kakao/auth/start", publicMiddleware, kakaoAuthStart);
globalRouter.get("/kakao/auth/end", publicMiddleware, kakaoAuthEnd);

export default globalRouter;
