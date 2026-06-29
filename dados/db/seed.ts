export const SEED_SQL = `
  INSERT OR IGNORE INTO temas (id, nome, miniatura, tema_original)
  VALUES (1, 'Tema de Teste', 'teste', 1);

  INSERT OR IGNORE INTO objetos (id, tema_id, nome, miniatura, url_glb)
  VALUES
    (1, 1, 'Williams FW46 de LEGO', NULL, 'https://drive.google.com/uc?export=download&id=1vmJjXvK-WH6fQH7r3TMxLrpkOxrVKDLW'),
    (2, 1, 'Companion Cube', NULL, 'https://drive.google.com/uc?export=download&id=1_POxMCaCfw1turFimpCOiQVDJZVksezk'),
    (3, 1, 'Avestruz', NULL, 'https://drive.google.com/uc?export=download&id=12y5TAsXUMdUVRqMkoxD1-uhqG57PHpwx');

  INSERT OR IGNORE INTO informacoes_objeto (objeto_id, titulo, conteudo)
  VALUES
    (1, 'Sobre o modelo',  'Réplica em LEGO do Williams FW46, carro utilizado pela equipe Williams Racing na temporada 2024 da Fórmula 1.'),
    (1, 'Equipe Williams', 'A Williams Racing é uma das equipes mais tradicionais da F1, fundada em 1977 por Frank Williams e Patrick Head.'),
    (1, 'Curiosidade',     'O FW46 usa suspensão dianteira pull-rod, escolha técnica pouco comum entre as equipes da Fórmula 1 em 2024.'),

    (2, 'Origem',      'O Weighted Companion Cube é um item icônico do jogo Portal (2007), da Valve. Tornou-se símbolo da franquia.'),
    (2, 'No jogo',     'Acompanha o jogador pelo Teste 17 do laboratório Aperture Science, sendo o único companheiro naquela fase.'),
    (2, 'Curiosidade', 'Fãs adotaram o Companion Cube como mascote do Portal. Existem versões em pelúcia, estatuetas e recriações.'),

    (3, 'Sobre a espécie', 'A avestruz (Struthio camelus) é a maior ave do mundo, podendo atingir 2,7 m de altura e pesar até 156 kg.'),
    (3, 'Habitat',         'Vive em savanas e desertos da África subsaariana. Adaptada a ambientes áridos, percorre longas distâncias.'),
    (3, 'Curiosidade',     'Apesar de não voar, é o animal terrestre mais veloz de duas pernas, alcançando 70 km/h em sprint.');
`;