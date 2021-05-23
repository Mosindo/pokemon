import { useEffect, useState } from "react";
import SelectSearch from 'react-select-search';
import "./images/pokemon.png";

const PokemonInformation = (props) => {
  const [pokemon, setPokemon] = useState();
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (props.pokemon) {
      fetch(props.pokemon.url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          setPokemon(response);
        });
    }
  }, [props.pokemon]);

  useEffect(() => {
    if (searchValue) {
      fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchValue}`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setPokemon(response);
        });
    }
  }, [searchValue]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
    .then((response) => {return response.json()})
    .then((response) => {
      //response.results
      setOptions(response.results.map((result) => {
        return {name: result.name, value: result.name}
      }))
    })
  }, [])

  const onSearch = (pokemonName) => {
    setSearchValue(pokemonName)
  }

  return (
    <div className="pokemonInformationContainer">
      <div className="container-fluid">
        <div className="row">
        <SelectSearch options={options} value={searchValue} placeholder="Choose your pokemon" onChange={onSearch}/>
        </div>
        <div className="row">
          {pokemon ? (
            <>
              <div className="col-6">
                <img
                  className="pokemonInformationImage"
                  src={pokemon.sprites.front_default}
                  alt={`pokemon ${pokemon.name}`}
                ></img>
              </div>
              <div className="col-6">
                <p>Name: {pokemon.name}</p>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>
                  Type:{" "}
                  {pokemon.types
                    .map((type) => {
                      return type.type.name;
                    })
                    .join(", ")}
                </p>
              </div>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonInformation;
