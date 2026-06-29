export const SEED_SQL = `
  INSERT OR IGNORE INTO temas (id, nome, miniatura, tema_original)
  VALUES
    (1, 'Artefatos dos Games',                  'artefatos-games', 1),
    (2, 'Esportes',                             'esportes',        1),
    (3, 'Animais de Estimação',                 'animais',         1),
    (4, 'Aeronaves (Escala 1:48)',              'teste',           1),
    (5, 'Monumentos Históricos (Escala 1:200)', 'teste',           1);

  INSERT OR IGNORE INTO objetos (id, tema_id, nome, miniatura, url_glb)
  VALUES
    -- Artefatos dos Games
    (1,  1, 'Companion Cube',                   NULL, 'https://drive.google.com/uc?export=download&id=1_POxMCaCfw1turFimpCOiQVDJZVksezk'),
    (2,  1, 'Capacete do Master Chief',         NULL, 'https://drive.google.com/uc?export=download&id=19gF895ozEmQzE-3lGbDMkB9RIednrd7u'),
    (3,  1, 'Moonlight Greatsword',             NULL, 'https://drive.google.com/uc?export=download&id=1fkgxNI7mFP5-_IYpDaWin30Af5UbCNP8'),
    -- Esportes
    (4,  2, 'Williams FW46 de LEGO',            NULL, 'https://drive.google.com/uc?export=download&id=1vmJjXvK-WH6fQH7r3TMxLrpkOxrVKDLW'),
    (5,  2, 'Taça da Champions League',         NULL, 'https://drive.google.com/uc?export=download&id=1uOKtXbJ0CvPUrdeG9ZvTdNIN68W9IV_M'),
    (6,  2, 'Taça Conmebol Libertadores',       NULL, 'https://drive.google.com/uc?export=download&id=1TrmoUDjHrtocxZ5qYu3KuGhLY_resTaV'),
    -- Animais de Estimação
    (7,  3, 'King Cobra',                       NULL, 'https://drive.google.com/uc?export=download&id=1UWlTYChU3UgtA7DtjD2wSavB6hjE8jzt'),
    (8,  3, 'Avestruz',                         NULL, 'https://drive.google.com/uc?export=download&id=12y5TAsXUMdUVRqMkoxD1-uhqG57PHpwx'),
    -- Aeronaves
    (9,  4, 'F-117 Nighthawk',                  NULL, 'https://drive.google.com/uc?export=download&id=1wMkdm12CfjncxRkXqkFdxC5dX3Nf_RKW'),
    (10, 4, 'Antonov AN-225',                   NULL, 'https://drive.google.com/uc?export=download&id=1iXiylyNMmYA8RaC0h88tQkvvI1vrRIyj'),
    (11, 4, 'Spitfire',                         NULL, 'https://drive.google.com/uc?export=download&id=1sdr7BjlD3FVOaFx8gZ_pCcS7r3GdZ3t1'),
    (12, 4, 'Savoia-Marchetti SM.79 Sparviero', NULL, 'https://drive.google.com/uc?export=download&id=1hwg9pWAMghAis1Of6cOSbMZ0Ptoh0szo'),
    (13, 4, 'F-22 Raptor',                      NULL, 'https://drive.google.com/uc?export=download&id=1X3ZifJXvQIRXMtdd8cBDP8aP7M7OFIFc'),
    -- Monumentos Históricos
    (14, 5, 'Torre Eiffel, Paris',              NULL, 'https://drive.google.com/uc?export=download&id=19jOfoCDn1DmU5bjedVWB_kHrgFT9JE9i'),
    (15, 5, 'Nossa Senhora das Vitórias',       NULL, 'https://drive.google.com/uc?export=download&id=1dc3UTtOHBRjt0POG4qJ1aKnvGygxoX-Z'),
    (16, 5, 'Catedral de Colônia',              NULL, 'https://drive.google.com/uc?export=download&id=1ug4Z68_yUtlwpz4AhHi9wH2gSAFYbWV1'),
    (17, 5, 'Estátua do Imperador Trajano',     NULL, 'https://drive.google.com/uc?export=download&id=1IrNswdToFKXcdR2jmOhxFB9fiv7Z7Q2Q'),
    (18, 5, 'Estátua da Liberdade, NY',         NULL, 'https://drive.google.com/uc?export=download&id=1G9-VF0hytWHpInIcAM_aWgQOZ35DD3i9'),
    (19, 5, 'Pirâmide de Miquerinos, Gizé',    NULL, 'https://drive.google.com/uc?export=download&id=1fQ-zAJ03XX4yKXE_ezpIquR_yoDvUnGy'),
    (20, 5, 'Coliseu, Roma',                    NULL, 'https://drive.google.com/uc?export=download&id=1991vJS7aIoZrTnb5L7aci7FRdwPh5C8R'),
    (21, 5, 'Cristo Redentor, Rio',             NULL, 'https://drive.google.com/uc?export=download&id=1E30vEEEzwyzjBmJNRYX2l590rgVnYMz7');

  INSERT OR IGNORE INTO informacoes_objeto (objeto_id, titulo, conteudo)
  VALUES
    -- Companion Cube
    (1, 'Origem',      'O Weighted Companion Cube é um item icônico do jogo Portal (2007), da Valve. Apesar de inanimado e incapaz de falar, tornou-se um dos maiores símbolos da franquia e da cultura gamer ao redor do mundo.'),
    (1, 'No jogo',     'No Teste 17 do laboratório Aperture Science, o Companion Cube é o único companheiro do jogador. No final da fase, GLaDOS instrui sua incineração — gerando um dos momentos mais emotivos e marcantes de Portal.'),
    (1, 'Curiosidade', 'Fãs ao redor do mundo adotaram o Companion Cube como mascote de Portal. Existem versões em pelúcia, estatuetas colecionáveis e inúmeras recriações artísticas espalhadas pela internet e eventos de cultura pop.'),

    -- Capacete do Master Chief
    (2, 'O personagem',  'Master Chief Petty Officer John-117 é o protagonista da franquia Halo. Supersoldado do programa SPARTAN-II da UNSC, defende a humanidade contra a aliança alienígena Covenant ao longo de toda a série.'),
    (2, 'A armadura',    'O traje MJOLNIR Mark VI integra escudo de energia, exosqueleto reativo e suporte para IA embutida — no caso de John-117, a Cortana. O conjunto eleva força, velocidade e reflexos do usuário a níveis sobre-humanos.'),
    (2, 'Identidade',    'Por toda a trilogia original de Halo, o rosto de Master Chief permanece oculto ao jogador. Sua identidade visual resume-se à icônica viseira dourada e à armadura verde-escuro, que viraram símbolo dos videogames.'),
    (2, 'Curiosidade',   'O programa SPARTAN-II recrutava crianças de apenas 6 anos. John foi escolhido por seu potencial genético e passou décadas de treinamento e modificações físicas antes de se tornar o soldado mais letal da humanidade.'),

    -- Moonlight Greatsword
    (3, 'A espada',      'A Moonlight Greatsword é uma das espadas mais icônicas dos videogames, presente em diversas obras da FromSoftware — de King''s Field a Elden Ring — com nomes e histórias distintos em cada universo.'),
    (3, 'Em Elden Ring', 'Em Elden Ring, recebe o nome de Dark Moon Greatsword e pertence ao lore de Ranni, a Bruxa da Lua Negra. Ao ser carregada ao máximo, dispara projéteis de luz lunar que causam alto dano mágico.'),
    (3, 'Tradição',      'A Moonlight Greatsword aparece em mais de dez jogos da FromSoftware ao longo de três décadas. Os fãs a consideram o Easter Egg permanente da desenvolvedora — uma tradição que atravessa gerações de consoles.'),

    -- Williams FW46 de LEGO
    (4, 'O modelo',        'Réplica em LEGO Technic do Williams FW46, carro da Williams Racing na temporada 2024 da Fórmula 1. O kit oficial possui mais de 1.400 peças, com câmbio de palheta, direção e cockpit funcionais.'),
    (4, 'Equipe Williams', 'A Williams Racing é uma das equipes mais tradicionais da F1, fundada em 1977 por Frank Williams e Patrick Head. Ao longo da história, conquistou sete títulos de construtores e nove de pilotos.'),
    (4, 'O FW46',          'O FW46 adota suspensão dianteira pull-rod, escolha técnica pouco comum entre as equipes em 2024. A configuração foi escolhida visando ganhos aerodinâmicos e melhor equilíbrio do carro nas curvas rápidas.'),
    (4, 'Curiosidade',     'A Williams não vencia uma corrida desde 2012. O FW46 marcou o retorno competitivo da equipe ao grid, com pontuações consistentes na temporada 2024 e expectativas crescentes para os anos seguintes.'),

    -- Taça da Champions League
    (5, 'O troféu',    'A Taça da UEFA Champions League é o prêmio máximo do futebol europeu de clubes, entregue desde 1956 ao campeão do maior torneio continental. É considerada a taça mais cobiçada do futebol mundial.'),
    (5, 'Design',      'Com 74 cm de altura e 7,5 kg, é confeccionada em prata banhada a ouro. As alças em formato de asa são seu traço mais reconhecível — e foram mantidas em todas as versões do troféu ao longo da história.'),
    (5, 'Recordistas', 'O Real Madrid é o maior campeão da história, com 15 títulos. O clube dominou os anos 1950–60 e voltou a uma era de domínio nos anos 2010, vencendo quatro das cinco edições entre 2014 e 2018.'),
    (5, 'Curiosidade', 'Clubes que venceram a competição 5 vezes — ou 3 vezes consecutivas — têm direito de manter uma réplica permanente do troféu original. O Real Madrid guarda cinco réplicas desse tipo em seu museu.'),

    -- Taça Conmebol Libertadores
    (6, 'O troféu',    'A Taça Conmebol Libertadores é o prêmio máximo do futebol sul-americano de clubes, entregue desde 1960 ao campeão do torneio mais importante do continente — equivalente à Champions League europeia.'),
    (6, 'Design',      'Com 47 cm de altura, é produzida em prata com detalhes dourados. A base traz os escudos dos países membros da Conmebol, representando a união das nações sul-americanas em torno do futebol.'),
    (6, 'Recordistas', 'Independiente, da Argentina, é o maior campeão histórico com sete títulos. No Brasil, Flamengo e Santos se destacam, com conquistas marcantes que ficaram na memória do futebol sul-americano.'),
    (6, 'Curiosidade', 'A final era disputada em dois jogos até 2019, quando passou a ser jogo único em campo neutro, no modelo da Champions. A primeira final nesse formato foi vencida pelo Flamengo sobre o River Plate.'),

    -- King Cobra
    (7, 'A espécie',   'A King Cobra (Ophiophagus hannah) é a maior serpente venenosa do mundo, podendo atingir 5,5 metros de comprimento. Vive entre 20 e 25 anos em liberdade e é nativa de florestas da Ásia tropical.'),
    (7, 'Habitat',     'Encontrada em florestas da Índia, sudeste da Ásia e sul da China. Prefere ambientes próximos a rios e florestas úmidas e densas, onde caça principalmente outras cobras — inclusive espécies venenosas.'),
    (7, 'Veneno',      'Seu veneno neurotóxico é capaz de matar um elefante adulto em poucas horas, atacando diretamente o sistema nervoso central. Apesar da letalidade, a cobra-rei evita confrontos com humanos sempre que possível.'),
    (7, 'Curiosidade', 'É a única serpente do mundo que constrói ninhos para seus ovos e permanece próxima até o nascimento dos filhotes. Esse comportamento parental ativo é extremamente raro entre os répteis em geral.'),

    -- Avestruz
    (8, 'A espécie',   'A avestruz (Struthio camelus) é a maior ave viva do mundo, podendo atingir 2,7 metros de altura e pesar até 156 kg. É nativa das savanas e regiões áridas da África subsaariana.'),
    (8, 'Adaptações',  'Adaptada a ambientes de calor extremo, pode ficar longos períodos sem beber água, extraindo umidade dos alimentos. Percorre dezenas de quilômetros diários em busca de comida nas planícies africanas.'),
    (8, 'Velocidade',  'Apesar de não voar, é o animal bípede mais veloz do mundo, alcançando 70 km/h em sprint e mantendo 50 km/h por longas distâncias. Usa as asas para se equilibrar e mudar de direção em alta velocidade.'),
    (8, 'Curiosidade', 'Os ovos de avestruz são os maiores produzidos por qualquer ave viva — chegam a 1,4 kg, equivalendo a cerca de 24 ovos de galinha. A casca é tão resistente que suporta o peso de um adulto humano sem quebrar.'),

    -- F-117 Nighthawk
    (9, 'A aeronave',         'O F-117 Nighthawk foi o primeiro avião de combate operacional projetado do zero com tecnologia stealth. Desenvolvido pela Lockheed em sigilo total, realizou seu primeiro voo em 1981 no deserto de Nevada.'),
    (9, 'Tecnologia stealth', 'Seu design angular fragmenta os sinais de radar em vez de refletí-los de volta ao receptor. Combinado ao revestimento absorvente, tornava o avião praticamente invisível para sistemas de defesa antiaéreos da época.'),
    (9, 'Missões reais',      'O F-117 entrou em combate pela primeira vez na invasão do Panamá, em 1989. Na Guerra do Golfo de 1991, conduziu ataques a alvos estratégicos em Bagdá com precisão e furtividade inéditas na aviação militar.'),
    (9, 'Curiosidade',        'Apesar da designação "F" (Fighter), o F-117 nunca foi um caça — era um bombardeiro furtivo de precisão. A classificação enganosa foi adotada pelo Pentágono intencionalmente para ocultar a real função da aeronave.'),

    -- Antonov AN-225
    (10, 'A aeronave',  'O Antonov AN-225 Mriya foi o maior avião já construído. Com 84 metros de comprimento e 88,4 metros de envergadura, foi desenvolvido pela União Soviética em 1988 para uma missão muito específica.'),
    (10, 'Função',      'Criado para transportar o ônibus espacial soviético Buran sobre a fuselagem. Após o fim da URSS e o cancelamento do programa Buran, foi convertido para carga e passou a transportar itens extraordinários ao redor do mundo.'),
    (10, 'Recordes',    '"Mriya" significa "sonho" em ucraniano. O AN-225 bateu mais de 240 recordes de aviação, incluindo maior carga transportada por via aérea: 253,8 toneladas em um único voo registrado oficialmente.'),
    (10, 'Curiosidade', 'O único exemplar construído foi destruído em fevereiro de 2022, nos ataques russos ao aeroporto de Hostomel, no início da invasão russa à Ucrânia. Havia planos para um segundo exemplar, mas nunca foi concluído.'),

    -- Spitfire
    (11, 'A aeronave',           'O Supermarine Spitfire é um dos caças mais icônicos da aviação. Projetado por Reginald Mitchell e equipado com o motor Merlin da Rolls-Royce, foi o principal caça britânico na Segunda Guerra Mundial.'),
    (11, 'Batalha da Bretanha',  'Na Batalha da Bretanha (1940), o Spitfire e o Hawker Hurricane foram a última linha de defesa do Reino Unido contra a Luftwaffe. Churchill imortalizou os pilotos com a frase: "Nunca tantos deveram tanto a tão poucos."'),
    (11, 'Evolução',             'O Spitfire foi produzido em mais de 20 variantes durante a guerra, com melhorias progressivas de motor, armamento e aerodinâmica. As versões finais atingiam mais de 720 km/h — quase o dobro da versão inicial.'),
    (11, 'Curiosidade',          'Mais de 20.300 Spitfires foram construídos durante o conflito. Exemplares voadores são raridades valorizadas em mais de 3 milhões de dólares no mercado de aeronaves históricas restauradas.'),

    -- Savoia-Marchetti SM.79 Sparviero
    (12, 'A aeronave', 'O Savoia-Marchetti SM.79 Sparviero foi o principal bombardeiro torpedo da Regia Aeronautica italiana na Segunda Guerra Mundial. Entrou em serviço em 1934, inicialmente como avião civil de competição e transporte.'),
    (12, 'O nome',     '"Sparviero" significa "gavião" em italiano. O apelido refletia a capacidade letal da aeronave nos ataques a navios aliados no Mediterrâneo — seus torpedeiros afundaram dezenas de embarcações ao longo do conflito.'),
    (12, 'Design',     'O SM.79 era um trimotor com fuselagem de madeira e estrutura mista, incomum para a época. Sua corcova dorsal, que abrigava posições de artilharia, o tornava visualmente único entre os bombardeiros da Segunda Guerra.'),
    (12, 'Curiosidade','Foi o avião mais produzido da Itália durante a guerra, com mais de 1.200 unidades fabricadas. Após o conflito, continuou em serviço em forças aéreas do Líbano, Síria e Iugoslávia até meados dos anos 1950.'),

    -- F-22 Raptor
    (13, 'A aeronave',  'O F-22 Raptor é o caça de superioridade aérea mais avançado em operação no mundo. Desenvolvido pela Lockheed Martin em parceria com a Boeing, entrou em serviço na Força Aérea dos Estados Unidos em 2005.'),
    (13, 'Tecnologia',  'Combina furtividade stealth, supercruise — voo supersônico sem pós-combustor — e supermaneuverabilidade em um único caça de quinta geração. Seus sensores integrados oferecem consciência situacional total do espaço aéreo.'),
    (13, 'Capacidades', 'O F-22 opera em missões ar-ar e ar-solo com igual eficácia. Seus mísseis ficam armazenados em compartimentos internos para preservar a assinatura de radar mínima — requisito essencial da tecnologia stealth.'),
    (13, 'Curiosidade', 'O governo americano proibiu por lei a exportação do F-22 para qualquer outro país, mesmo aliados próximos. Apenas 187 unidades foram fabricadas — bem abaixo das 750 planejadas — antes do encerramento da linha em 2011.'),

    -- Torre Eiffel, Paris
    (14, 'Construção',       'A Torre Eiffel foi projetada por Gustave Eiffel para a Exposição Universal de Paris, em 1889. Erguida em 2 anos, 2 meses e 5 dias, usa mais de 18 mil peças de ferro forjado unidas por 2,5 milhões de rebites.'),
    (14, 'Recepção inicial', 'Quando foi inaugurada, a torre foi duramente criticada por artistas e arquitetos parisienses, que a chamavam de "monstruosa" e "vergonhosa". Com o tempo, tornou-se o monumento mais visitado do mundo.'),
    (14, 'Iluminação',       'À noite, a torre recebe um show de luzes piscantes por 5 minutos a cada hora. Por decisão judicial, fotografá-la iluminada é protegido por direito autoral na França — diferente das fotos diurnas, que são livres.'),
    (14, 'Curiosidade',      'A torre cresce cerca de 15 cm no verão por dilatação térmica do metal. É repintada a cada sete anos na mesma tonalidade — o "marrom Torre Eiffel" —, processo que consome aproximadamente 60 toneladas de tinta.'),

    -- Nossa Senhora das Vitórias
    (15, 'A lenda',      'A lenda conta que Nossa Senhora apareceu sobre o mar, montada em uma mula branca, guiando pescadores perdidos durante uma tempestade no Cabo Espichel. O local tornou-se destino de peregrinação desde o século XV.'),
    (15, 'O santuário',  'O Santuário do Cabo Espichel, em Setúbal, Portugal, abriga a Igreja de Nossa Senhora do Cabo e as Casas da Memória — pavilhões laterais erguidos para acolher os peregrinos que chegavam em romaria de toda a região.'),
    (15, 'A devoção',    'A devoção a Nossa Senhora das Vitórias esteve ligada às conquistas portuguesas: marinhas e soldados invocavam sua proteção antes das grandes navegações e campanhas militares da coroa portuguesa nos séculos XV e XVI.'),
    (15, 'Curiosidade',  'O Cabo Espichel é um dos pontos mais ocidentais da Europa. Além do santuário, a região guarda pegadas fossilizadas de dinossauros do período Jurássico — um dos sítios paleontológicos mais importantes de Portugal.'),

    -- Catedral de Colônia
    (16, 'Construção',     'Iniciada em 1248, a Catedral de Colônia levou mais de 630 anos para ser concluída, com término em 1880. As duas torres góticas atingem 157 metros de altura e foram por quatro anos as estruturas mais altas do mundo.'),
    (16, 'As relíquias',   'A catedral abriga as Relíquias dos Três Reis Magos, trazidas de Milão em 1164. Seu relicário dourado do século XIII é considerado a maior obra-prima do ourivesaria gótica medieval existente no mundo.'),
    (16, 'Segunda Guerra', 'Os bombardeios aliados destruíram quase toda Colônia durante a Segunda Guerra. A catedral sofreu 14 impactos diretos de bombas, mas não ruiu — pilotos a usavam como ponto de referência e evitavam derrubá-la.'),
    (16, 'Curiosidade',    'Patrimônio Mundial da UNESCO desde 1996 e o monumento mais visitado da Alemanha. Dizem que a obra de manutenção nas paredes da catedral nunca é completamente encerrada — sempre há pedra ou vitral a restaurar.'),

    -- Estátua do Imperador Trajano
    (17, 'O imperador',   'Marco Úlpio Trajano (53–117 d.C.) governou Roma entre 98 e 117 d.C. Sob seu comando, o Império Romano atingiu a maior extensão territorial de sua história, da Bretanha ao Oriente Médio.'),
    (17, 'Londres romana','A réplica fica em Tower Hill, Londres. Foi instalada em 1980 para evocar o passado romano da cidade: Londinium foi fundada pelos romanos por volta de 43 d.C. e cresceu até se tornar uma das maiores cidades do Império.'),
    (17, 'A estátua',     'A peça é cópia de um original romano conservado nos Museus Vaticanos. A versão londrina foi criada por artistas italianos e doada à cidade como símbolo dos laços históricos entre a Itália e o Reino Unido.'),
    (17, 'Curiosidade',   'Trajano foi o primeiro imperador romano nascido fora da Itália — natural da Hispânia (atual Espanha). Seu reinado foi tão bem avaliado que o Senado romano o declarou "Optimus Princeps" — o Melhor dos Príncipes.'),

    -- Estátua da Liberdade, NY
    (18, 'Presente da França', 'A Estátua da Liberdade foi um presente da França aos Estados Unidos, simbolizando a amizade entre as duas nações e os ideais democráticos compartilhados. Foi inaugurada em 28 de outubro de 1886, no porto de Nova York.'),
    (18, 'Projetistas',        'Esculpida pelo francês Frédéric Auguste Bartholdi, a estrutura interna foi projetada por Gustave Eiffel — o mesmo engenheiro da famosa torre em Paris, construída três anos depois da estátua ser concluída.'),
    (18, 'Simbolismo',         'A coroa possui 7 pontas, representando os sete oceanos e os sete continentes. A tocha simboliza a luz da liberdade iluminando o mundo; as correntes quebradas aos pés representam a libertação da opressão.'),
    (18, 'Curiosidade',        'A estátua era originalmente de cobre brilhante, com tonalidade avermelhada. A cor verde-azulada característica — chamada pátina — se formou gradualmente pela oxidação do cobre exposto ao ar marítimo de Nova York.'),

    -- Pirâmide de Miquerinos, Gizé
    (19, 'O faraó',       'A Pirâmide de Miquerinos foi construída por volta de 2510 a.C. para o faraó Menkaure, da IV Dinastia egípcia. É a menor das três grandes pirâmides de Gizé, mas não menos impressionante em engenharia e execução.'),
    (19, 'O complexo',    'Junto às pirâmides de Quéops e Quéfren, forma o complexo arqueológico de Gizé, às margens do Cairo. O conjunto, que inclui também a Grande Esfinge, é um dos patrimônios mais estudados e visitados da humanidade.'),
    (19, 'O granito',     'Diferentemente das pirâmides vizinhas, a face inferior de Miquerinos é revestida de granito vermelho de Assuã — muito mais raro e difícil de trabalhar que o calcário. Parte desse revestimento ainda é visível hoje.'),
    (19, 'Curiosidade',   'Quando Napoleão invadiu o Egito em 1798, calculou que as três pirâmides de Gizé continham pedra suficiente para construir um muro de 3 metros de altura e 30 cm de espessura ao redor de toda a França.'),

    -- Coliseu, Roma
    (20, 'O anfiteatro',  'O Coliseu de Roma é o maior anfiteatro da Antiguidade, construído entre 70 e 80 d.C. pelo Imperador Vespasiano e seu filho Tito. Com quatro andares e uma elipse de 188 metros, comportava até 80 mil espectadores.'),
    (20, 'Os espetáculos','Além dos combates de gladiadores, o Coliseu sediava caçadas de animais selvagens (venationes) e naumaquias — encenações de batalhas navais com a arena completamente inundada com água trazida por aquedutos.'),
    (20, 'A engenharia',  'O Coliseu possuía 80 entradas numeradas que permitiam encher e esvaziar o anfiteatro em menos de 10 minutos. Essa solução de gestão de multidões ainda influencia projetos de estádios e arenas esportivas hoje.'),
    (20, 'Curiosidade',   'Por séculos após a queda do Império, o Coliseu foi usado como pedreira: suas pedras foram reaproveitadas em igrejas, palácios e pontes de Roma. Estima-se que dois terços do material original tenha sido removido.'),

    -- Cristo Redentor, Rio
    (21, 'A estátua',   'O Cristo Redentor é uma das sete maravilhas do mundo moderno, erguido no pico do Corcovado, a 710 metros de altitude no Rio de Janeiro. Foi inaugurado em 12 de outubro de 1931 e é o símbolo maior do Brasil.'),
    (21, 'Construção',  'Projetado pelo engenheiro Heitor da Silva Costa e esculpido pelo artista francês Paul Landowski em Paris. O soapstone — pedra-sabão — que reveste toda a estátua foi aplicado em mosaico por artesãos brasileiros.'),
    (21, 'A vista',     'Do alto do Corcovado, a estátua emoldura uma das vistas mais famosas do mundo: a Baía de Guanabara, o Pão de Açúcar, as praias de Copacabana e Ipanema e toda a imensidão da cidade espalhada abaixo.'),
    (21, 'Curiosidade', 'O Cristo Redentor é atingido por raios cerca de 6 vezes por ano. Sensores na estrutura registram cada impacto e equipes de conservação inspecionam e reparam o soapstone danificado com regularidade.');
`;
