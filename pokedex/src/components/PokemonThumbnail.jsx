import { useEffect, useState } from "react";

const PokemonThumbnail = ({ pokemon }) => {
  /*
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        }
    }
    */
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch(pokemon.url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setImage(response.sprites.front_default);
      });
  }, [pokemon]);
  return (
    <>
      <img src={image} alt={`pokemon ${pokemon.name}`} />
      <h2>{pokemon.name}</h2>
    </>
  );
};

export default PokemonThumbnail;
