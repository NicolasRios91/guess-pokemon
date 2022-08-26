import {useState, useEffect} from "react";

import {Pokemon} from "./types";
import api from "./api";
import {theme} from "./utils";
import {formatText} from "./utils/helpers";
import "./components/pokedex.css";

const App = () => {
  const getInitialCorrectScore = () => Number(localStorage.getItem("correct"));
  const getInitialWrongScore = () => Number(localStorage.getItem("wrong"));

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [showPokemon, setShowPokemon] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<number>(getInitialCorrectScore || 0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(getInitialWrongScore || 0);

  const msg = searchValue === pokemon?.name ? "Congratulations!!" : "Wrong Answer";

  const handleOnClick = () => {
    setShowPokemon(true);
    const isCorrect = searchValue === pokemon?.name;

    isCorrect ? setCorrectAnswers(correctAnswers + 1) : setWrongAnswers(wrongAnswers + 1);
    localStorage.setItem("correct", (correctAnswers + (isCorrect ? 1 : 0)).toString());
    localStorage.setItem("wrong", (wrongAnswers + (!isCorrect ? 1 : 0)).toString());
  };

  const handlePlayAgain = () => {
    api.random().then((response) => setPokemon(response));
    setShowPokemon(false);
    setSearchValue("");
  };

  useEffect(() => {
    api.random().then((response) => setPokemon(response));
  }, []);

  return (
    <main>
      <div className="container">
        <div className="podekex__left">
          <div style={{display: "flex", alignItems: "center"}}>
            <div className="green__circle" />
            <div className="blue__circle" />
          </div>
          <div className="img_container">
            <p
              className={`${theme.tagType.text} ${theme.status.primary}`}
              style={{textAlign: "center"}}
            >
              {showPokemon ? pokemon?.name : <br />}
            </p>
            <img className={showPokemon ? "show-pokemon" : ""} src={pokemon?.image} />
          </div>
          <div
            style={{display: "flex", width: "400px", margin: "20px auto", justifyContent: "center"}}
          >
            <input
              className={theme.tagType.input}
              id="guess-pokemon"
              placeholder="Insert search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(formatText(e.target.value))}
            />

            <button className={theme.tagType.button} onClick={() => handleOnClick()}>
              Try
            </button>
          </div>
          <div style={{textAlign: "center"}}>
            <button className={theme.tagType.button} onClick={() => handlePlayAgain()}>
              Play again
            </button>
          </div>
          <p>correct: {correctAnswers}</p>
          <p>incorrect: {wrongAnswers}</p>
          <p
            className={`${theme.tagType.text} ${
              msg === "Congratulations!!" ? theme.status.success : theme.status.warning
            }`}
          >
            {showPokemon && msg}
          </p>
        </div>
      </div>
    </main>
  );
};

export default App;
