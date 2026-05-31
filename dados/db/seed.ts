export const SEED_SQL = `
  INSERT OR IGNORE INTO temas (id, nome, miniatura, tema_original)
  VALUES (1, 'Tema de Teste', 'teste', 1);

  INSERT OR IGNORE INTO objetos (id, tema_id, nome, miniatura, url_glb)
  VALUES
    (1, 1, 'Williams FW46 de LEGO', NULL, 'https://drive.google.com/uc?export=download&id=1vmJjXvK-WH6fQH7r3TMxLrpkOxrVKDLW'),
    (2, 1, 'Companion Cube', NULL, 'https://drive.google.com/uc?export=download&id=1_POxMCaCfw1turFimpCOiQVDJZVksezk'),
    (3, 1, 'Avestruz', NULL, 'https://drive.google.com/uc?export=download&id=12y5TAsXUMdUVRqMkoxD1-uhqG57PHpwx');
`;