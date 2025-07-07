import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { insertTask } from "../../../apiFrontEnd/tarefas";
import { notificar } from "../../components/Toast";

const TaskAdd = ({ tasklist, setTasklist, usuarioLogado }) => {
  const [newTask, setNewTask] = useState("");
  console.log("Usuário logado:", usuarioLogado);

  const adicionarTarefa = async () => {
    const nova = newTask.trim().toLowerCase();
    const jaExiste = tasklist.some(
      (t) => t.tarefa.trim().toLowerCase() === nova
    );

    if (jaExiste) {
      notificar("erro", "Tarefa já cadastrada!");
      return;
    }
    if (!newTask.trim()) return;

    try {
      const tarefaCriada = await insertTask({
        tarefa: newTask,
        nome: usuarioLogado.nome,
        email: usuarioLogado.email,
        usuarioId: Number(usuarioLogado.usuarioId), // 👈 Garantido como número
      });

      setTasklist([...tasklist, tarefaCriada]);
      setNewTask("");
      notificar("sucesso", "Tarefa adicionada com sucesso!");
    } catch (error) {
      notificar("erro", "Erro ao adicionar tarefa.");
    }
  };

  return (
    <div className="task__add">
      <input
        className="input__new-task"
        type="text"
        name="input__new-task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite a nova tarefa"
      />
      <button className="button__add" onClick={adicionarTarefa}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default TaskAdd;
