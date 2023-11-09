import axios from "axios";
import pokemonApi from "../api/pokemonApi";
import { Pokemon } from "../interfaces/pokemon";
import { PokemonListResponse } from "../interfaces/pokemon-list.response";
import { PokemonResponse } from "../interfaces/pokemon.response";

export const getPokemons = async ():Promise<Pokemon[]> => {
  const { data } = await pokemonApi.get<PokemonListResponse>('/pokemon?limit=45');
  const pokemonPromises: Promise<Pokemon>[] = [];
  for (const { url } of data.results) {
    const pokemonPromise = axios.get<PokemonResponse>(url).then(({ data }) => {
      return {
        id: data.id,
        name: data.name,
        frontSprite: data.sprites.front_default,
      }
    });

    pokemonPromises.push(pokemonPromise);
  }

  const pokemons = await Promise.all(pokemonPromises);
  return pokemons;
}

