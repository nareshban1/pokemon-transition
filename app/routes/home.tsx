import PokemonList from "~/components/List";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Poke Dex" }];
}

export default function Home() {
  return (
    <div>
      <PokemonList />
    </div>
  );
}
