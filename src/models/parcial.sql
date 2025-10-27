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