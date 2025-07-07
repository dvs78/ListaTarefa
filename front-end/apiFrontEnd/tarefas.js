import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE_URL = "https://listatarefa-4pc8.onrender.com/api";

// Buscar todas as tarefas
export async function getAllTask() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const { usuarioId } = usuario;

    const { data } = await axios.get(`${BASE_URL}/tarefas`, {
      params: { usuarioId },
    });

    return data;
  } catch (error) {
    const msg =
      error.response?.data?.erro ||
      error.response?.data?.message ||
      error.message ||
      "Erro desconhecido";
    console.error("Erro ao buscar tarefas:", msg);
    return [];
  }
}

// Deletar tarefa por ID
export async function deleteByIdTask(tarefa) {
  try {
    const response = await axios.delete(`${BASE_URL}/tarefas/${tarefa.id}`);
    return response.status === 200;
  } catch (error) {
    const msg =
      error.response?.data?.erro || error.message || "Erro desconhecido";
    console.error("Erro ao excluir tarefa:", msg);
    return false;
  }
}

// Inserir nova tarefa
export async function insertTask(novaTarefa) {
  try {
    const response = await axios.post(`${BASE_URL}/tarefas`, novaTarefa);
    return response.data; // retorna a tarefa criada com ID, etc.
  } catch (error) {
    const msg =
      error.response?.data?.erro || error.message || "Erro desconhecido";
    console.error("Erro ao inserir tarefa:", msg);
    throw new Error(msg);
  }
}

// Editar tarefa por ID
export async function updateTask(tarefaAtualizada) {
  try {
    const response = await axios.put(
      `${BASE_URL}/tarefas/${tarefaAtualizada.id}`,
      tarefaAtualizada
    );
    return response.data; // retorna a tarefa atualizada
  } catch (error) {
    const msg =
      error.response?.data?.erro || error.message || "Erro desconhecido";
    console.error("Erro ao atualizar tarefa:", msg);
    throw new Error(msg);
  }
}
