import { RequestHandler } from "express";
import db from "../../../utils/db";

const getAllFavoriteController: RequestHandler = async (req, res) => {
  try {
    const userID = req.userPayload?.id;

    if (!userID) {
      throw Error();
    }

    const captured = await db.pokemonCapturedByUser.findMany({
      where: {
        userId: userID,
        isFavorited: true,
      },
      select: {
        pokemon: {
          include: {
            types: true,
          },
        },
      },
    });

    return res.status(200).json(captured.map(({ pokemon }) => pokemon));
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong. Try again in a while");
  }
};

export default getAllFavoriteController;
