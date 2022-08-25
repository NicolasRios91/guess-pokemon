import {useState, useEffect} from "react";

import {Pokemon} from "./types";
import api from "./api";
import {theme} from "./utils";

const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [showPokemon, setShowPokemon] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleOnClick = () => {
    setShowPokemon(true);
  };

  useEffect(() => {
    api.random().then((response) => setPokemon(response));
  }, []);

  return (
    <main>
      <p className={`${theme.tagType.text} ${theme.status.primary}`}>
        {showPokemon ? pokemon?.name : <br />}
      </p>
      <img className={showPokemon ? "show-pokemon" : ""} src={pokemon?.image} />
      <div style={{display: "flex", width: "400px"}}>
        <input
          className={theme.tagType.input}
          id="guess-pokemon"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className={theme.tagType.button} onClick={() => handleOnClick()}>
          Guess
        </button>
      </div>
    </main>
  );
};

export default App;
