import React, { unstable_ViewTransition as ViewTransition } from "react";
import { Link } from "react-router";
import { pokemonList } from "~/data";
import type { PokemonData } from "~/types";

function PokemonList() {
  const [pokemon, setPokemon] = React.useState<PokemonData[]>(pokemonList);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-center text-2xl mb-8">Pokémon Database</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {pokemon?.map((poke) => {
            const mainType = poke.types[0]?.type.name || "normal";
            return (
              <Link
                to={`/pokemon/${poke.name}`}
                key={poke.name}
                className="no-underline text-inherit"
              >
                <div
                  className={`rounded-xl overflow-hidden shadow-lg ${getTypeColor(
                    mainType
                  )} bg-opacity-10 border-2 border-yellow-500 
                               transform transition duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-2xl relative`}
                >
                  {/* Pokemon name with Pokeball icon */}
                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-80">
                    <ViewTransition name={`pokemon-name-${poke.name}`}>
                      <h2 className="text-sm font-bold capitalize">
                        {poke.name}
                      </h2>
                    </ViewTransition>
                    <div className="flex items-center">
                      <ViewTransition name={`pokemon-${poke.id}`}>
                        <span className="text-xs font-semibold text-gray-700">
                          #{poke.id}
                        </span>
                      </ViewTransition>
                      <div className="ml-2 w-5 h-5 rounded-full bg-red-600 border-2 border-white flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Pokemon image with animation */}
                  <div
                    className={`p-6 flex justify-center items-center ${getTypeColor(
                      mainType
                    )} transition-all duration-500 hover:bg-opacity-50`}
                  >
                    <ViewTransition name={`pokemon-${poke.name}`}>
                      <picture className="transform hover:scale-110 hover:rotate-3 transition-transform duration-300">
                        <source
                          srcSet={
                            poke.sprites.other["official-artwork"]
                              .front_default || poke.sprites.front_default
                          }
                          type="image/png"
                        />
                        <img
                          src={
                            poke.sprites.other["official-artwork"]
                              .front_default || poke.sprites.front_default
                          }
                          alt={poke.name}
                          className="w-36 h-36 object-contain drop-shadow-lg"
                        />
                      </picture>
                    </ViewTransition>
                  </div>

                  {/* Pokemon types */}
                  <div className="px-4 py-3 bg-white bg-opacity-90">
                    <ViewTransition name={`pokemon-stats-${poke.name}`}>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {poke.types.map((type) => (
                          <span
                            key={type.type.name}
                            className={`${getTypeColor(
                              type.type.name
                            )} text-white text-[0.5rem] font-bold px-2 py-1 rounded-full uppercase transition-all duration-300 hover:shadow-md`}
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                    </ViewTransition>

                    {/* Pokemon stats preview */}
                    <div className="grid grid-cols-2 gap-2 text-[0.6rem] text-gray-700">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">HP:</span>
                        <span>
                          {poke.stats.find((s) => s.stat.name === "hp")
                            ?.base_stat || "??"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">ATK:</span>
                        <span>
                          {poke.stats.find((s) => s.stat.name === "attack")
                            ?.base_stat || "??"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
