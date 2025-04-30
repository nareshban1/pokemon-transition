import React, { unstable_ViewTransition as ViewTransition } from "react";
import { useParams, Link } from "react-router";
import { pokemonList } from "~/data";
import type { PokemonData } from "~/types";

export function meta({ params }: { params: { name: string } }) {
  return [{ title: `Pokemon: ${params.name}` }];
}

export default function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = React.useState<PokemonData | null>(
    pokemonList.find((poke) => poke.name === name) || null
  );

  // Get pokemon type color
  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: "bg-gray-300",
      fire: "bg-red-300",
      water: "bg-blue-300",
      electric: "bg-yellow-300",
      grass: "bg-green-300",
      ice: "bg-blue-300",
      fighting: "bg-red-300",
      poison: "bg-purple-300",
      ground: "bg-yellow-300",
      flying: "bg-indigo-300",
      psychic: "bg-pink-300",
      bug: "bg-lime-300",
      rock: "bg-yellow-300",
      ghost: "bg-purple-300",
      dragon: "bg-indigo-300",
      dark: "bg-gray-300",
      steel: "bg-gray-300",
      fairy: "bg-pink-300",
    };

    return typeColors[type] || "bg-gray-300";
  };

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold capitalize mb-4 md:mb-0">
          {pokemon.name}
        </h1>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded"
        >
          Back to List
        </Link>
      </div>

      <div className="bg-white overflow-hidden ">
        <div className={` p-8 flex justify-center`}>
          <ViewTransition name={`pokemon-${pokemon.name}`}>
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-48 h-48 md:w-96 md:h-96 object-contain drop-shadow-lg"
            />
          </ViewTransition>
        </div>

        <div className="p-4 md:p-6 border rounded shadow-2xl">
          <div className="flex items-center flex-wrap gap-4 mb-6">
            <div className="text-xl font-bold">#{pokemon.id}</div>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`${getTypeColor(
                    type.type.name
                  )} text-white text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-base md:text-lg font-bold mb-4 border-b-2 pb-2">
                Basic Info
              </h2>
              <div className="grid grid-cols-2 gap-y-4 text-xs">
                <div className="font-semibold">Height:</div>
                <div>{pokemon.height / 10} m</div>
                <div className="font-semibold">Weight:</div>
                <div>{pokemon.weight / 10} kg</div>
                <div className="font-semibold">Base XP:</div>
                <div>{pokemon.base_experience}</div>
              </div>
            </div>

            <div>
              <h2 className="text-base md:text-lg font-bold mb-4 border-b-2 pb-2">
                Stats
              </h2>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold capitalize text-xs">
                        {stat.stat.name}:
                      </span>
                      <span className="text-xs">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (stat.base_stat / 255) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-base md:text-lg font-bold mb-4 border-b-2 pb-2">
              Abilities
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="bg-gray-100 px-3 py-1 rounded-full text-[0.6rem] capitalize"
                >
                  {ability.ability.name} {ability.is_hidden && "(Hidden)"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
