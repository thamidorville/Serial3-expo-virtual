export const SCHEMA_SQL = `
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS temas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    miniatura TEXT NOT NULL DEFAULT 'teste',
    tema_original INTEGER NOT NULL DEFAULT 0 CHECK (tema_original IN (0, 1))
  );

  CREATE TABLE IF NOT EXISTS objetos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema_id INTEGER NOT NULL,
    nome TEXT NOT NULL,
    miniatura TEXT,
    url_glb TEXT NOT NULL,
    FOREIGN KEY (tema_id) REFERENCES temas (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS informacoes_objeto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    objeto_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL CHECK (LENGTH(conteudo) <= 140),
    FOREIGN KEY (objeto_id) REFERENCES objetos (id) ON DELETE CASCADE,
    UNIQUE (objeto_id, titulo, conteudo)
  );
`;