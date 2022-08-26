export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface ImageScreenProps {
  showPokemon: boolean;
  pokemon: {
    name: string;
    image: string;
  } | null;
}

export interface ButtonProps {
  label: string;
  onClick: VoidFunction;
}

export interface ButtonLedsProps {
  isCorrect: boolean | null;
}
