import { token } from "morgan";
import User from "../models/User";
import Video from "../models/Video";

import bcrypt from "bcrypt";
import { json } from "express";
import { create } from "connect-mongo";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("globals/home", { pageTitle: "Home", videos });
};
export const getJoin = (req, res) => {
  return res.render("globals/join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, password, password2, name, location } = req.body;
  const existingEmail = await User.exists({ email });
  if (existingEmail) {
    return res.render("globals/join", {
      pageTitle: "Join",
      errorMessage: "Email already exists.",
    });
  }
  if (password !== password2) {
    return res.render("globals/join", {
      pageTitle: "Join",
      errorMessage: "Confirm password again.",
    });
  }

  try {
    const createdUser = await User.create({ email, password, name, location });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("/globals/join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("globals/login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email, githubId: null });
  if (!foundUser) {
    return res.status(400).render("globals/login", {
      pageTitle: "Login",
      errorMessage: "Email doesn't exist.",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).render("globals/login", {
      pageTitle: "Login",
      errorMessage: "Password doesn't match.",
    });
  }
  req.session.isLoggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.loggedInUser = null;
  req.session.isLoggedIn = false;
  return res.redirect("/");
};

export const search = (req, res) => {
  return res.send("<h1>This will be a search page</h1>");
};

export const githubAuthStart = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const githubAuthorizeParams = {
    client_id: process.env.GITHUB_CLIEND_ID,
    allow_signup: true,
    scope: "read:user user:email",
  };
  const urlSearchParams = new URLSearchParams(githubAuthorizeParams).toString();
  const githubAuthorizeUrl = `${baseUrl}?${urlSearchParams}`;
  return res.redirect(githubAuthorizeUrl);
};

export const githubAuthEnd = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const githubAccessTokenParams = {
    client_id: process.env.GITHUB_CLIEND_ID,
    client_secret: process.env.GITHUB_CLIEND_SECRET,
    code: req.query.code,
  };
  const urlSearchParams = new URLSearchParams(
    githubAccessTokenParams
  ).toString();
  const githubAccessTokenUrl = `${baseUrl}?${urlSearchParams}`;
  try {
    const tokenJsonData = await (
      await fetch(githubAccessTokenUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      })
    ).json();
    if ("access_token" in tokenJsonData) {
      const { access_token } = tokenJsonData;
      const githubUserJsonData = await (
        await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      const githubEmailJsonData = await (
        await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
      ).json();
      const userEmailObject = githubEmailJsonData.find(
        (email) => email.primary === true && email.verified === true
      );
      if (!userEmailObject) {
        return res.redirect("/login");
      }

      const foundUser = await User.findOne({ email: userEmailObject.email });
      if (foundUser) {
        // user with same email already exists, then login
        req.session.isLoggedIn = true;
        req.session.loggedInUser = foundUser;
        return res.redirect("/");
      } else {
        // new user, then create account
        const createdUser = await User.create({
          email: userEmailObject.email,
          name: githubUserJsonData.name,
          password: "",
          location: githubUserJsonData.location,
          githubId: githubUserJsonData.id,
          avatarUrl: githubUserJsonData.avatar_url,
        });
        req.session.isLoggedIn = true;
        req.session.loggedInUser = createdUser;
        return res.redirect("/");
      }
    } else {
      // cannot access token
      return res.redirect("/login");
    }
  } catch (error) {
    console.log("githubAuthEnd error");
    return res.render("globals/login", {
      pageTitle: "Login",
      errorMessage: "깃허브 로그인에 실패했습니다.",
    });
  }
};

export const kakaoAuthStart = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const kakaoAuthorizeParams = {
    response_type: "code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: "http://localhost:4000/kakao/auth/end",
  };
  const urlSearchParams = new URLSearchParams(kakaoAuthorizeParams).toString();
  const kakaoAuthorizeUrl = `${baseUrl}?${urlSearchParams}`;

  return res.redirect(kakaoAuthorizeUrl);
};

export const kakaoAuthEnd = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const kakaoAccessTokenParams = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: "http://localhost:4000/kakao/auth/end",
    code: req.query.code,
  };
  const urlSearchParams = new URLSearchParams(
    kakaoAccessTokenParams
  ).toString();
  const kakaoAccessTokenUrl = `${baseUrl}?${urlSearchParams}`;

  const tokenJsonData = await (
    await fetch(kakaoAccessTokenUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  console.log(tokenJsonData);
  if ("access_token" in tokenJsonData) {
    const { access_token } = tokenJsonData;
    const kakaoUserJsonData = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
    ).json();
    console.log(kakaoUserJsonData);
  } else {
  }
};
