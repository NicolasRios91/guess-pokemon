import {useState, useEffect} from "react";

import {Pokemon} from "./types";
import api from "./api/api";
import Button from "./components/button";
import ButtonLeds from "./components/leds";
import ImageScreen from "./components/image";
import {formatText} from "./utils/helpers";
import {
  CLASS_NES_SELECT,
  CLASS_NES_TEXT,
  CLASS_NES_STATUS_SUCCESS,
  CLASS_NES_STATUS_WARNING,
  CORRECT_ANSWER_MESSAGE,
  WRONG_ANSWER_MESSAGE,
  CORRECT,
  WRONG,
} from "./utils/constants";

const App = () => {
  const getInitialCorrectScore = () => Number(localStorage.getItem(CORRECT));
  const getInitialWrongScore = () => Number(localStorage.getItem(WRONG));

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [showPokemon, setShowPokemon] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<number>(getInitialCorrectScore || 0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(getInitialWrongScore || 0);

  const msg = searchValue === pokemon?.name ? CORRECT_ANSWER_MESSAGE : WRONG_ANSWER_MESSAGE;

  const handleTryClick = () => {
    setShowPokemon(true);
    const isCorrect = searchValue === pokemon?.name;

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      localStorage.setItem(CORRECT, (correctAnswers + 1).toString());
    } else {
      setWrongAnswers(wrongAnswers + 1);
      localStorage.setItem(WRONG, (wrongAnswers + 1).toString());
    }
  };

  const handlePlayAgainClick = () => {
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
          <ButtonLeds />
          <ImageScreen pokemon={pokemon} showPokemon={showPokemon} />
          <div className="search__container">
            <input
              aria-label="Insert search"
              className={CLASS_NES_SELECT}
              id="guess-pokemon"
              placeholder="Insert search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(formatText(e.target.value))}
            />
            <Button aria-label="search pokemon" label="Try" onClick={handleTryClick} />
          </div>
          <div style={{margin: "auto"}}>
            <Button aria-label="Play Again" label="Play Again" onClick={handlePlayAgainClick} />
          </div>
          <p style={{marginTop: "10px"}}>correct: {correctAnswers}</p>
          <p>incorrect: {wrongAnswers}</p>
          <p
            className={`${CLASS_NES_TEXT} ${
              msg === CORRECT_ANSWER_MESSAGE ? CLASS_NES_STATUS_SUCCESS : CLASS_NES_STATUS_WARNING
            }`}
          >
            {showPokemon ? msg : <br />}
          </p>
        </div>
      </div>
    </main>
  );
};

export default App;
