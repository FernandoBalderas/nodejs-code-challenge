import { RequestHandler } from "express";
import db from "../../../utils/db";
import pokeApi from "../../../utils/pokeapi";
import { APIPokemonResponse } from "../../../../types/APIPokemonResponse";

const addCapturedController: RequestHandler = async (req, res) => {
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

    // Check if pokemon exists in db
    console.log(`Searching for pokemon with identifier: ${id || name}`);
    const pokemonExistsInDB = await db.pokemon.findFirst({
      where: {
        OR: [
          {
            id,
          },
          { name },
        ],
      },
    });

    let pokemonId: number;

    if (!pokemonExistsInDB) {
      console.log("Pokemon does not exist in DB. Adding pokemon to DB");
      const created = await addNewPokemonToDB(
        String(id || name).toLocaleLowerCase(),
      );
      console.log("Pokemon added to DB");
      pokemonId = created.id;
    } else {
      console.log(`Pokemon already exists`);
      pokemonId = pokemonExistsInDB.id;
    }

    console.log("Searching if user already owns that pokemon");
    const owned = await db.pokemonCapturedByUser.findFirst({
      where: {
        userId: userID,
        pokemonId,
      },
      select: {
        pokemon: {
          include: {
            types: true,
          },
        },
      },
    });

    if (owned) {
      console.log("Pokemon is already owned");
      return res.status(200).json(owned.pokemon);
    } else {
      console.log("Pokemon has not been captured before");
    }

    console.log(`Creating captured pokemon record`);
    const captured = await db.pokemonCapturedByUser.create({
      data: {
        userId: userID,
        pokemonId,
      },
      select: {
        pokemon: {
          include: {
            types: true,
          },
        },
      },
    });
    console.log(`Captured pokemon added`);

    return res.status(201).json(captured.pokemon);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong. Try again in a while");
  }
};

async function addNewPokemonToDB(pokemonIdentifier: string) {
  console.log("Fetching data from PokeAPI of identifier: " + pokemonIdentifier);
  const found: APIPokemonResponse = (
    await pokeApi.get(`pokemon/${pokemonIdentifier}`)
  ).data;

  const types = found.types.map(({ type: { name } }) => name);
  const typesIDs: { id: number }[] = [];

  for (let type of types) {
    console.log(`Searching for type ${type}`);
    const typeExists = await db.type.findFirst({
      where: {
        name: type,
      },
    });

    if (typeExists) {
      console.log(`Type ${type} already exists in DB`);
      typesIDs.push({
        id: typeExists.id,
      });
      continue;
    } else {
      console.log(`Type ${type} does not exist in DB. Adding it to DB`);
      const createdType = await db.type.create({
        data: {
          name: type,
        },
      });
      console.log(`Type added`);
      typesIDs.push({
        id: createdType.id,
      });
    }
  }

  const pokemonData = parsePokemonData(found);

  if (!pokemonData) {
    throw Error("Could not parse data for: " + found);
  }

  console.log(`Creating pokemon record`);
  const created = await db.pokemon.create({
    data: {
      ...pokemonData,
      types: {
        connect: typesIDs,
      },
    },
  });
  console.log(`Pokemon record added`);

  return created;
}

function parsePokemonData(data: APIPokemonResponse) {
  const id: number = data.id;
  const name: string = data.name;
  const weight: number = data.weight;
  const height: number = data.height;

  const statsEntries: [string, number][] = data.stats.map(
    ({ stat: { name }, base_stat }) => [name, base_stat],
  );
  const stats = Object.fromEntries(statsEntries);

  const hp: number = stats.hp;
  const attack: number = stats.attack;
  const defense: number = stats.defense;
  const specialAttack: number = stats["special-attack"];
  const specialDefense: number = stats["special-defense"];
  const speed: number = stats.speed;

  const allFieldsAreValid =
    id &&
    name &&
    weight &&
    height &&
    hp &&
    attack &&
    defense &&
    specialAttack &&
    specialDefense &&
    speed;

  if (!allFieldsAreValid) {
    return null;
  }

  return {
    id,
    name,
    weight,
    height,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
  };
}

export default addCapturedController;
