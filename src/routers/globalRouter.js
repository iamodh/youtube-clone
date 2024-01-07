import express from "express";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  search,
} from "../controllers/globalController";

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;
