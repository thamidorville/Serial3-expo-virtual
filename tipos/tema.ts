import { Objeto } from './objeto';

export type CategoriaTema = "original" | "customizado";

export interface Tema {
  id: string | number;
  nome: string;
  categoria: CategoriaTema;
  objetos: Objeto[];
  miniatura: string;
}
