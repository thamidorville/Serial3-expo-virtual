import { Objeto } from "./objeto";

export interface Tema {
  id: number;
  nome: string;
  miniatura: string;
  tema_original: number;
  objetos: Objeto[];
}
