import {CLASS_NES_BUTTON} from "../../utils/constants";
import {ButtonProps} from "../../types";

const Button = ({label, onClick}: ButtonProps) => (
  <button className={CLASS_NES_BUTTON} type="button" onClick={onClick}>
    {label}
  </button>
);

export default Button;
