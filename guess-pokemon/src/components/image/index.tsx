import {CLASS_NES_TEXT, CLASS_NES_STATUS_PRIMARY} from "../../utils/constants";
import {ImageScreenProps} from "../../types";
import "./styles.css";

const ImageScreen = ({showPokemon, pokemon}: ImageScreenProps) => (
  <div className="img_container">
    <p className={`${CLASS_NES_TEXT} ${CLASS_NES_STATUS_PRIMARY}`}>
      {showPokemon ? pokemon?.name : <br />}
    </p>
    <img
      alt={pokemon?.name || ""}
      className={showPokemon ? "show-pokemon" : ""}
      src={pokemon?.image}
    />
  </div>
);

export default ImageScreen;
