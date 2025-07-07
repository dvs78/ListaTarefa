import { Router } from "express";
import DbClassTarefas from "../dbOnline/DbClassTarefas.js";

const rotas = Router();

// Pegar tudo por ID
rotas.get("/", async (req, res) => {
  const { usuarioId } = req.query;

  if (!usuarioId) {
    return res
      .status(400)
      .json({ erro: "Campo usuarioId obrigatório na query" });
  }

  try {
    const result = await new DbClassTarefas().getByUsuarioId(usuarioId);
    res.status(200).send(result);
  } catch (error) {
    console.error("Erro na rota GET /:", error.message);
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
});

// Deletar por ID
rotas.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Recebido DELETE para ID:", id);

  try {
    const deletado = await new DbClassTarefas().deleteById(id);
    console.log("Resultado da exclusão:", deletado); // 👈 importante

    res.status(200).send({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error("Erro na rota DELETE /:id:", error.message);
    res.status(404).json({ erro: error.message }); // 👈 retorne 404 com a mensagem do erro
  }
});

// Inserir nova tarefa
rotas.post("/", async (req, res) => {
  const { tarefa, nome, email, usuarioId } = req.body;
  console.log("Dados recebidos no backend:", req.body); // 👈 ADICIONE ISSO

  if (!tarefa || !nome || !email || !usuarioId) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: tarefa, nome, email e usuarioId" });
  }

  try {
    const novaTarefa = await new DbClassTarefas().insert({
      tarefa,
      nome,
      email,
      usuarioId, // ✅ agora incluído no insert
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error("Erro na rota POST /:", error.message);
    res.status(500).json({ erro: "Erro ao inserir tarefa" });
  }
});

// Editar tarefa por ID
rotas.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { tarefa, nome, email } = req.body;

  if (!tarefa || !nome || !email) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: tarefa, nome e email" });
  }

  try {
    const tarefaAtualizada = await new DbClassTarefas().update(id, {
      tarefa,
      nome,
      email,
    });

    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error("Erro na rota PUT /:id:", error.message);
    res.status(500).json({ erro: error.message });
  }
});

export default rotas;
