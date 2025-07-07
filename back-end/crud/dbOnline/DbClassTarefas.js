import DbClass from "./DbClass.js";

class DbClassTarefas extends DbClass {
  // Pegar tudo
  async getAll() {
    try {
      const results = await super.getAll("tarefas", [
        "id",
        "email",
        "nome",
        "tarefa",
        "usuarioId", // ← ADICIONE ESTA LINHA
      ]);

      return results;
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error.message);
      return [];
    }
  }

  // Pegar tarefa por ID
  async getByUsuarioId(usuarioId) {
    return super.getByID("tarefas", "usuarioId", usuarioId, [
      "id",
      "tarefa",
      "nome",
      "email",
      "usuarioId",
    ]);
  }

  // Deletar por id
  async deleteById(id) {
    try {
      const deletado = await super.deleteById("tarefas", Number(id));
      if (!deletado) {
        throw new Error("Tarefa não encontrada");
      }
      return true;
    } catch (error) {
      console.error("Erro ao excluir no banco:", error.message);
      throw error;
    }
  }

  // Inserir tarefa
  async insert(dados) {
    try {
      // Validação mínima (opcional)
      if (!dados.tarefa || !dados.nome || !dados.email || !dados.usuarioId) {
        throw new Error("Campos obrigatórios: tarefa, nome, email e usuarioId");
      }

      const novaTarefa = await super.insertTask("tarefas", dados);
      return novaTarefa;
    } catch (error) {
      console.error("Erro ao inserir tarefa no banco:", error.message);
      throw error;
    }
  }

  // Editar tarefa por ID
  async update(id, dados) {
    try {
      if (!dados.tarefa || !dados.nome || !dados.email) {
        throw new Error("Campos obrigatórios: tarefa, nome e email");
      }

      const tarefaAtualizada = await super.updateById(
        "tarefas",
        Number(id),
        dados
      );

      if (!tarefaAtualizada) {
        throw new Error("Tarefa não encontrada para atualização");
      }

      return tarefaAtualizada;
    } catch (error) {
      console.error("Erro ao editar tarefa no banco:", error.message);
      throw error;
    }
  }
}

export default DbClassTarefas;
