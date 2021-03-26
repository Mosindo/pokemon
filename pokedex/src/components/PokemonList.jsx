import { useEffect, useState } from "react";
import PokemonThumbnail from "./PokemonThumbnail";

const PokemonList = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setPokemonList(response.results);
        setNumberOfPage(Math.floor(response.count / 100));
      });
  }, [page]);

  const previousPage = () => {
    if (page >= 100) {
      setPage(page - 100);
    }
  };
  const nextPage = () => {
    setPage(page + 100);
  };

  const paginationItem = () => {
    const pages = [];
    for (let i = 0; i < numberOfPage; i++) {
      pages.push(
        <li class="page-item">
          <button class="page-link" onClick={() => setPage(i * 100)}>
            {i + 1}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="pokemonListContainer">
      <div className="container-fluid">
        <div className="row">
          {pokemonList.map((pokemon) => {
            return (
              <div
                className="col-6 col-md-4 pokemonThumbnail"
                onClick={() => {
                  props.onPokemonClick(pokemon);
                }}
              >
                <PokemonThumbnail pokemon={pokemon} />
              </div>
            );
          })}
        </div>
        <div className="pokemonListButtons">
          <div className="pokemonListButtonsContainer">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button
                    class="page-link"
                    aria-label="Previous"
                    onClick={previousPage}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {paginationItem()}
                <li class="page-item">
                  <button
                    class="page-link"
                    aria-label="Next"
                    onClick={nextPage}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
