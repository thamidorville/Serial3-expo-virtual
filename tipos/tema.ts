import { Objeto } from "./objeto";

export interface Tema {
  id: number;
  nome: string;
  miniatura: string;
  temaOriginal: boolean;
  objetos: Objeto[];
}
