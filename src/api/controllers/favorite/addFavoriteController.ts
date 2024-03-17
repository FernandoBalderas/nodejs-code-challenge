import { RequestHandler } from "express";
import db from "../../../utils/db";

const addFavoriteController: RequestHandler = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json("Bad request, body not found");
    }
    const userID = req.userPayload?.id;

    if (!userID) {
      throw Error();
    }

    const id: number = req.body.id;
    const name: string = req.body.name;

    if (!id && !name) {
      return res.status(400).json("Name or Id of Pokemon not provided");
    }

    console.log(
      `Searching for captured pokemon with identifier: ${id || name}`,
    );

    const pokemonQuery = {
      AND: [
        {
          OR: [
            {
              pokemon: {
                id,
              },
            },
            {
              pokemon: {
                name,
              },
            },
          ],
        },
        { userId: userID },
      ],
    };

    const owned = await db.pokemonCapturedByUser.findFirst({
      where: pokemonQuery,
    });

    if (!owned) {
      return res.status(400).send("User has not captured this pokemon yet");
    }

    const favorite = await db.pokemonCapturedByUser.update({
      where: {
        userId_pokemonId: {
          userId: owned.userId,
          pokemonId: owned.pokemonId,
        },
      },
      data: {
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

    return res.status(201).json(favorite.pokemon);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong. Try again in a while");
  }
};

export default addFavoriteController;
