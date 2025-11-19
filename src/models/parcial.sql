CREATE TABLE usuarios (
  usuario_id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  registro TIMESTAMP DEFAULT now()
);

SELECT * FROM usuarios;

INSERT INTO usuarios(nombre,email,password) VALUES ('jorge','jorge@g.c','omla123');

-- Juegos disponibles en la tienda
CREATE TABLE juegos (
  juego_id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(12,2) NOT NULL CHECK (precio >= 0),
  categoria TEXT,
  imagen TEXT,
  registro TIMESTAMP DEFAULT now()
);

-- Pedidos (ventas de juegos)
CREATE TABLE pedidos (
  pedido_id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(usuario_id),
  juego_id INT NOT NULL REFERENCES juegos(juego_id),
  total DECIMAL(12,2) NOT NULL CHECK (total >= 0),
  fecha TIMESTAMP DEFAULT now()
);

-- Catálogo inicial
INSERT INTO juegos (titulo, descripcion, precio, categoria, imagen) VALUES
-- ACCIÓN
('DOOM Eternal', 'Shooter frenético con combates intensos contra demonios del infierno.', 39.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg'),
('Red Dead Redemption 2', 'Aventura de mundo abierto en el Viejo Oeste con historia inmersiva.', 59.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg'),
('Grand Theft Auto V', 'Juego de crimen y acción con mundo abierto y múltiples protagonistas.', 29.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg'),
('Assassin''s Creed Valhalla', 'Explora la era vikinga en un vasto mundo abierto.', 49.99, 'Acción', 'https://staticctf.ubisoft.com/8LpXae0s6hvX91nXn2w7o/o96lI92fGjBjjXNMTvEih/6b1a82f1e5b3ecf604f9b4b38183b081/ac-valhalla-keyart.jpg'),
('Cyberpunk 2077', 'RPG de acción futurista ambientado en Night City.', 59.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg'),
('Far Cry 6', 'Shooter de mundo abierto ambientado en una isla caribeña en conflicto.', 39.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg'),
('God of War', 'Kratos y su hijo Atreus emprenden un viaje épico en la mitología nórdica.', 49.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg'),
('Just Cause 4', 'Explora un mundo destructible con acción explosiva y libertad total.', 24.99, 'Acción', 'https://cdn.cloudflare.steamstatic.com/steam/apps/517630/header.jpg'),

-- RPG
('The Witcher 3: Wild Hunt', 'RPG de mundo abierto con historia profunda y decisiones morales.', 29.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg'),
('Elden Ring', 'Juego de rol y acción en mundo abierto creado por FromSoftware.', 59.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg'),
('The Elder Scrolls V: Skyrim', 'Explora un vasto mundo lleno de dragones y aventuras épicas.', 39.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg'),
('Dark Souls III', 'RPG de acción con combates exigentes y ambientación oscura.', 39.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg'),
('Final Fantasy XV', 'RPG de acción con historia cinemática y un grupo de héroes modernos.', 49.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/637650/header.jpg'),
('Dragon Age: Inquisition', 'Combina estrategia y acción en un mundo de fantasía épica.', 19.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222690/header.jpg'),
('Mass Effect Legendary Edition', 'Trilogía remasterizada de ciencia ficción con decisiones morales.', 59.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/header.jpg'),
('Persona 5 Royal', 'RPG japonés con historia estudiantil y combates por turnos.', 49.99, 'RPG', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg'),

-- INDIE
('Hollow Knight', 'Aventura de acción en un mundo subterráneo lleno de insectos.', 14.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg'),
('Celeste', 'Plataformas desafiante sobre superación personal.', 19.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg'),
('Stardew Valley', 'Simulador de granja con exploración y relaciones sociales.', 14.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg'),
('Undertale', 'RPG donde tus decisiones afectan la historia.', 9.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/391540/header.jpg'),
('Cuphead', 'Plataformas con estilo de caricatura y jefes difíciles.', 19.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg'),
('Hades', 'Roguelike de acción ambientado en la mitología griega.', 24.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg'),
('Slay the Spire', 'Juego de cartas y estrategia con elementos roguelike.', 19.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/646570/header.jpg'),
('Dead Cells', 'Roguelike con combate rápido y exploración de mazmorras.', 24.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg'),
('Ori and the Will of the Wisps', 'Plataformas con arte detallado y jugabilidad fluida.', 29.99, 'Indie', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg'),

-- ESTRATEGIA
('Civilization VI', 'Construye y expande tu imperio a través de las eras.', 29.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg'),
('Age of Empires IV', 'Estrategia en tiempo real con civilizaciones históricas.', 49.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg'),
('StarCraft II', 'Estrategia espacial con tres razas en guerra.', 0.00, 'Estrategia', 'https://static.wikia.nocookie.net/starcraft/images/4/40/SC2_Cover_Art.jpg'),
('XCOM 2', 'Dirige la resistencia humana contra una invasión alienígena.', 29.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/268500/header.jpg'),
('Total War: WARHAMMER III', 'Combina batallas tácticas con gestión de imperios.', 59.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1142710/header.jpg'),
('Cities: Skylines', 'Construye y gestiona una ciudad moderna.', 29.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg'),
('RimWorld', 'Colonia espacial de supervivencia y simulación narrativa.', 34.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/294100/header.jpg'),
('Planet Zoo', 'Crea y administra un zoológico realista.', 39.99, 'Estrategia', 'https://cdn.cloudflare.steamstatic.com/steam/apps/703080/header.jpg'),

-- DEPORTES
('FIFA 24', 'Simulación de fútbol con licencias oficiales y jugabilidad realista.', 69.99, 'Deportes', 'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_EASPORTSFC24StandardEditionUltimateTeamPoints_BronzeBoxedProduct_1920x1080-4b52d3d7988b1528141d5a14d5b36fcf'),
('NBA 2K24', 'Simulación de baloncesto con jugadores y equipos reales.', 69.99, 'Deportes', 'https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/header.jpg'),
('eFootball 2024', 'Juego gratuito de fútbol con enfoque en torneos en línea.', 0.00, 'Deportes', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1665460/header.jpg'),
('Forza Horizon 5', 'Carreras de mundo abierto ambientadas en México.', 59.99, 'Deportes', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg'),
('Gran Turismo 7', 'Simulación de conducción realista con cientos de autos.', 69.99, 'Deportes', 'https://image.api.playstation.com/vulcan/ap/rnd/202202/1510/5oLIBHqrKekJy5oQ1OtSWT8X.png'),
('Tony Hawk''s Pro Skater 1+2', 'Remake de los clásicos juegos de skate.', 39.99, 'Deportes', 'https://cdn.cloudflare.steamstatic.com/steam/apps/2395210/header.jpg'),
('Rocket League', 'Fútbol con autos impulsados por cohetes.', 0.00, 'Deportes', 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg'),
('Riders Republic', 'Deportes extremos en un enorme mundo abierto.', 49.99, 'Deportes', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1325860/header.jpg'),

-- AVENTURA
('The Legend of Zelda: Breath of the Wild', 'Explora el reino de Hyrule en un mundo abierto lleno de misterios.', 59.99, 'Aventura', 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero'),
('Minecraft', 'Juego de construcción, exploración y supervivencia.', 26.95, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg'),
('No Man''s Sky', 'Explora un universo infinito con planetas generados proceduralmente.', 49.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header.jpg'),
('Subnautica', 'Explora un planeta oceánico y sobrevive entre criaturas alienígenas.', 29.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg'),
('The Forest', 'Juego de supervivencia en un bosque lleno de mutantes.', 19.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg'),
('Raft', 'Sobrevive en una balsa en medio del océano recolectando recursos.', 19.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/648800/header.jpg'),
('Sea of Thieves', 'Aventura pirata multijugador en un mundo abierto.', 39.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg'),
('Tomb Raider', 'Explora tumbas antiguas y resuelve acertijos en selvas peligrosas.', 29.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/203160/header.jpg'),
('Little Nightmares II', 'Aventura oscura con elementos de terror y sigilo.', 29.99, 'Aventura', 'https://cdn.cloudflare.steamstatic.com/steam/apps/860510/header.jpg');