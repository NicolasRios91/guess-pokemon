import "./styles.css";
import {ButtonLedsProps} from "../../types";

const ButtonLeds = ({isCorrect = null}: ButtonLedsProps) => (
  <div className="leds__container">
    <div className={`green__circle${isCorrect ? " correct" : " wrong"}`} />
    <div className="blue__circle" />
    <div className="black__square" />
  </div>
);

export default ButtonLeds;
