import React, { useState } from "react";
import { deleteByIdTask, updateTask } from "../../../apiFrontEnd/tarefas";
import { notificar } from "../../components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ModalConfirmacao from "../../components/Confirmacao";

const TaskList = ({ tasklist, setTasklist, carregarTarefas }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [modoEdicaoId, setModoEdicaoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  const [modalConfirmarEdicao, setModalConfirmarEdicao] = useState(false);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);

  const pedirConfirmacao = (task) => {
    setTarefaSelecionada(task);
    setModalAberto(true);
  };

  const confirmarRemocao = async () => {
    if (!tarefaSelecionada) return;

    setCarregando(true);
    const sucesso = await deleteByIdTask(tarefaSelecionada);
    setCarregando(false);
    setModalAberto(false);

    if (sucesso) {
      await carregarTarefas();
      notificar("sucesso", "Tarefa excluída com sucesso!");
    } else {
      notificar("erro", "Tarefa não encontrada");
    }

    setTarefaSelecionada(null);
  };

  const iniciarEdicao = (task) => {
    setModoEdicaoId(task.id);
    setTextoEditado(task.tarefa);
  };

  const cancelarEdicao = () => {
    setModoEdicaoId(null);
    setTextoEditado("");
  };

  return (
    <div className="task__list">
      {tasklist.map((task) => (
        <div className="task__list-item" key={`task-${task.id}`}>
          {modoEdicaoId === task.id ? (
            <>
              <input
                className="input__edit"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
              />
              <div className="button__task">
                <button
                  className="button__save"
                  onClick={() => {
                    setTarefaParaEditar({
                      ...task,
                      tarefa: textoEditado.trim(),
                    });
                    setModalConfirmarEdicao(true);
                  }}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>

                <button className="button__cancel" onClick={cancelarEdicao}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{task.tarefa}</p>

              <div className="button__task">
                <button
                  className="button__edit"
                  onClick={() => iniciarEdicao(task)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  className="button__remove"
                  onClick={() => pedirConfirmacao(task)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Modal de exclusão */}
      <ModalConfirmacao
        aberto={modalAberto}
        onConfirmar={confirmarRemocao}
        onCancelar={() => setModalAberto(false)}
        carregando={carregando}
        titulo="Confirmar exclusão"
      >
        <span>
          Tem certeza que deseja excluir{" "}
          <strong>{tarefaSelecionada?.tarefa}</strong> de{" "}
          <strong>{tarefaSelecionada?.nome}</strong>?
        </span>
      </ModalConfirmacao>

      {/* Modal de edição com confirmação */}
      <ModalConfirmacao
        aberto={modalConfirmarEdicao}
        onConfirmar={async () => {
          if (!tarefaParaEditar || !tarefaParaEditar.tarefa) return;

          setCarregando(true);

          try {
            const sucesso = await updateTask(tarefaParaEditar);
            if (sucesso) {
              await carregarTarefas();
              notificar("sucesso", "Tarefa atualizada com sucesso!");
            }
          } catch (error) {
            notificar("erro", "Erro ao atualizar tarefa.");
          }

          setCarregando(false);
          setModoEdicaoId(null);
          setTextoEditado("");
          setTarefaParaEditar(null);
          setModalConfirmarEdicao(false);
        }}
        onCancelar={() => setModalConfirmarEdicao(false)}
        titulo="Confirmar edição"
        carregando={carregando}
      >
        <span>
          Tem certeza que deseja salvar a tarefa como{" "}
          <strong>{tarefaParaEditar?.tarefa}</strong>?
        </span>
      </ModalConfirmacao>
    </div>
  );
};

export default TaskList;
