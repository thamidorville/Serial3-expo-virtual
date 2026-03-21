import { SecaoTextoTema } from "./secaoTexto";

export interface Objeto {
  id: string;
  nome: string;
  url_download: string;
  thumbnail: string;
  secoes_texto: SecaoTextoTema[];
}