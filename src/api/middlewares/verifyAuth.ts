import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const verifyAuth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "abc");

    if (typeof decoded == "string") {
      throw Error();
    }

    req.userPayload = {
      id: decoded.id,
      username: decoded.username,
    };

    return next();
  } catch (err) {
    return res
      .status(401)
      .send(
        "Invalid Token, please login again to refresh your token or register if you dont have an account",
      );
  }
};

export default verifyAuth;
