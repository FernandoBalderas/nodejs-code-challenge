import axios from "axios";

const pokeApi = axios.create({
  baseURL: process.env.POKEMON_API_URL,
  timeout: 10000,
});

export default pokeApi;
