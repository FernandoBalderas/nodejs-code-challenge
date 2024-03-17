import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import db from "../../utils/db";
import jwt from "jsonwebtoken";

const register: RequestHandler = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
      return res
        .status(400)
        .send("Bad Request. Username or password not provided");
    }

    const hash = await bcrypt.hash(password, 2);

    const created = await db.user.create({
      data: {
        username,
        password_hash: hash,
      },
    });

    const token = generateJWT(created);

    return res.status(200).send(token);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong. Try again in a while");
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
      return res
        .status(400)
        .send("Bad Request. Username or password not provided");
    }

    // const hash = await bcrypt.hash(password, 2);

    const found = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!found) {
      return res.status(404).send("User does not exist. Please register");
    }

    const match = await bcrypt.compare(password, found.password_hash);

    if (!match) {
      res.status(401).send("Wrong user or password input");
    }

    const token = generateJWT(found);

    return res.status(200).send(token);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong. Try again in a while");
  }
};

function generateJWT(payload: { id: number; username: string }) {
  try {
    const token = jwt.sign(payload, process.env.SECRET_KEY || "abc", {
      expiresIn: "5m",
    });
    return token;
  } catch (err) {
    console.error("Could not create JWT");
  }
}

export default {
  register,
  login,
};
