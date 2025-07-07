-- CRIAÇÃO DA TABELA TAREFAS
CREATE TABLE IF NOT EXISTS public.tarefas(
  id SERIAL PRIMARY KEY,  -- id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuarioId INTEGER NOT NULL,
  email TEXT NOT NULL,
  nome TEXT NOT NULL,
  tarefa TEXT NOT NULL
);

-- ARRUMAR A COLUNA usuarioid para usuarioId
ALTER TABLE tarefas RENAME COLUMN usuarioid TO "usuarioId";

-- INSERIR 2  LEMBRETES
INSERT INTO tarefas (email, nome, tarefa) VALUES
('dvs.veiga78@gamil.com', 'Daniel', 'Abastecer o carro'),
('dvs.veiga78@gamil.com', 'Daniel', 'Acordar as 6');
