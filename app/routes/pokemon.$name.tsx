import React, { useEffect, useState } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
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
  const [statAnimationProgress, setStatAnimationProgress] = useState(0);

  // Animation effect for stats
  useEffect(() => {
    // Reset progress when new Pokemon is loaded
    setStatAnimationProgress(0);

    // Animate from 0 to 100 over 1 second
    const animationDuration = 1000; // ms
    const frameDuration = 16; // ~60fps
    const totalFrames = animationDuration / frameDuration;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = Math.min((frame / totalFrames) * 100, 100);
      setStatAnimationProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [pokemon]);

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

  // Calculate the maximum stat value for the Pokemon
  const maxStatValue = Math.max(...pokemon.stats.map((stat) => stat.base_stat));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
        <ViewTransition name={`pokemon-${pokemon.id}`}>
          <div className="text-xl font-bold">#{pokemon.id}</div>
        </ViewTransition>

        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded"
        >
          Back to List
        </Link>
      </div>

      <div className="bg-white  p-4 relative ">
        {/* Pokemon ID and Types */}
        <div className="flex items-center justify-center flex-wrap gap-4 mb-6">
          <ViewTransition name={`pokemon-name-${pokemon.name}`}>
            <h1 className="text-2xl font-bold capitalize mb-4 md:mb-0">
              {pokemon.name}
            </h1>
          </ViewTransition>
        </div>

        {/* Main content with simplified 3D layout */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center perspective-1000">
          {/* Left Column - Basic Info & Abilities */}
          <div className="pokemon-panel w-full md:w-1/3 order-2 md:order-1 transform md:rotate-y-45 md:translate-x-4 bg-transparent p-5">
            <div className="mb-8">
              <h2 className="text-base md:text-lg font-bold mb-4 border-b  pb-2 text-gray-700">
                Basic Info
              </h2>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="font-semibold">Height:</div>
                <div>{pokemon.height / 10} m</div>
                <div className="font-semibold">Weight:</div>
                <div>{pokemon.weight / 10} kg</div>
                <div className="font-semibold">Base XP:</div>
                <div>{pokemon.base_experience}</div>
              </div>
            </div>

            <div>
              <h2 className="text-base md:text-lg font-bold mb-4 border-b border-gray-200 pb-2 text-gray-700">
                Abilities
              </h2>
              <div className="flex flex-col gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="bg-gray-50 px-3 py-2 rounded text-sm capitalize border border-gray-200"
                  >
                    {ability.ability.name} {ability.is_hidden && "(Hidden)"}
                  </span>
                ))}
              </div>
            </div>
            <ViewTransition name={`pokemon-stats-${pokemon.name}`}>
              <div className="flex flex-wrap gap-2 mt-4">
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
            </ViewTransition>
          </div>

          {/* Center Column - Pokemon Image */}
          <div className="pokemon-image-container w-full md:w-2/3 order-1 md:order-2 flex flex-col items-center justify-center z-10">
            <div className="relative p-4">
              <ViewTransition name={`pokemon-${pokemon.name}`}>
                <img
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-[1000px] h-auto object-fill"
                />
              </ViewTransition>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="pokemon-panel w-full md:w-1/3 order-3 transform md:-rotate-y-45 md:-translate-x-4 bg-transparent p-5 ">
            <h2 className="text-base md:text-lg font-bold mb-4 border-b border-gray-200 pb-2 text-gray-700">
              Stats
            </h2>
            <div className="space-y-6">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold capitalize text-sm">
                      {stat.stat.name}:
                    </span>
                    <span className="text-sm">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-xs h-5 overflow-hidden">
                    <div
                      className={`${getTypeColor(
                        pokemon.types[0].type.name
                      )} h-5 transition-all duration-300 ease-out`}
                      style={{
                        width: `${Math.min(
                          100,
                          (stat.base_stat / maxStatValue) *
                            statAnimationProgress
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
