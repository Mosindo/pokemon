import logo from "./logo.svg";
import {useState} from "react";
import "./App.css";
import "./search.css";
import PokemonInformation from "./components/PokemonInformation";
import PokemonList from "./components/PokemonList";

function App() {
  const [pokemon, setPokemon] = useState({
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
  });
  return (
    <>
      <PokemonInformation pokemon={pokemon}/>
      <PokemonList onPokemonClick={setPokemon}/>
    </>
  );
}

export default App;
