export type CategoriaTema = "original" | "customizado";

export interface Tema {
  id: number;
  nome: string;
  miniatura: string;
  categoria: CategoriaTema;
}
