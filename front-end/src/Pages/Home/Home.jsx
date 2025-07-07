// import React, { useEffect, useState } from "react";
// import TaskAdd from "./TaskAdd";
// import TaskList from "./TaskList";
// import { getAllTask } from "../../../apiFrontEnd/tarefas.js";
// import BoasVindas from "../../components/BoasVindas";

// const Home = ({ usuarioLogado }) => {
//   const [tasklist, setTasklist] = useState([]);
//   const [mostrarBoasVindas, setMostrarBoasVindas] = useState(true);

//   const carregarTarefas = async () => {
//     const todasAsTarefas = await getAllTask(); // retorna todas as tarefas
//     console.log("todas as Tarefas carregadas:", todasAsTarefas); // 👈 veja se aparece

//     if (!usuarioLogado) return;

//     const idUsuario = usuarioLogado?.usuarioId;
//     const tarefasDoUsuario = todasAsTarefas.filter(
//       (tarefa) => tarefa.usuarioId === idUsuario
//     );

//     console.log("Tarefas carregadas:", tarefasDoUsuario); // 👈 veja se aparece

//     setTasklist(tarefasDoUsuario);
//   };

//   useEffect(() => {
//     carregarTarefas();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => setMostrarBoasVindas(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="main">
//       {mostrarBoasVindas && <BoasVindas nome={usuarioLogado?.nome} />}

//       <TaskAdd
//         tasklist={tasklist}
//         setTasklist={setTasklist}
//         usuarioLogado={usuarioLogado}
//       />

//       <TaskList
//         tasklist={tasklist}
//         setTasklist={setTasklist}
//         carregarTarefas={carregarTarefas}
//         usuarioLogado={usuarioLogado}
//       />
//     </div>
//   );
// };

// export default Home;

// // import React, { useState } from "react";
// // import { deleteByIdTask } from "../../../apiFrontEnd/tarefas";
// // import { notificar } from "../../components/Toast";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faTrash } from "@fortawesome/free-solid-svg-icons";
// // import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// // import { motion, AnimatePresence } from "framer-motion";

// // import ModalConfirmacao from "../../components/Confirmacao";

// // const TaskList = ({ tasklist, setTasklist, carregarTarefas }) => {
// //   const [modalAberto, setModalAberto] = useState(false);
// //   const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
// //   const [carregando, setCarregando] = useState(false);
// //   const [modoEdicaoId, setModoEdicaoId] = useState(null);
// //   const [textoEditado, setTextoEditado] = useState("");

// //   const pedirConfirmacao = (task) => {
// //     setTarefaSelecionada(task);
// //     setModalAberto(true);
// //   };

// //   const confirmarRemocao = async () => {
// //     if (!tarefaSelecionada) return;

// //     setCarregando(true);

// //     const sucesso = await deleteByIdTask(tarefaSelecionada);

// //     setCarregando(false);
// //     setModalAberto(false);

// //     if (sucesso) {
// //       await carregarTarefas();
// //       notificar("erro", "Tarefa excluída com sucesso!");
// //     } else {
// //       notificar("erro", "Erro ao excluir tarefa.");
// //     }

// //     setTarefaSelecionada(null);
// //   };

// //   return (
// //     <div className="task__list">
// //       <AnimatePresence>
// //         {tasklist.map((task) => (
// //           <motion.div
// //             className="task__list-item"
// //             key={`task-${task.id}`}
// //             initial={{ opacity: 0, y: 40 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <p>{task.tarefa}</p>
// //             <button
// //               className="button__remove"
// //               onClick={() => pedirConfirmacao(task)}
// //             >
// //               <FontAwesomeIcon icon={faTrash} />
// //             </button>

// //             <button
// //               className="button__remove"
// //               onClick={() => iniciarEdicao(task)}
// //             >
// //               <FontAwesomeIcon icon={faPenToSquare} />
// //             </button>
// //           </motion.div>
// //         ))}
// //       </AnimatePresence>

// //       <ModalConfirmacao
// //         aberto={modalAberto}
// //         onConfirmar={confirmarRemocao}
// //         onCancelar={() => setModalAberto(false)}
// //         carregando={carregando}
// //       >
// //         <span>
// //           Tem certeza que deseja excluir{" "}
// //           <strong>{tarefaSelecionada?.tarefa}</strong> de{" "}
// //           <strong>{tarefaSelecionada?.nome}</strong>?
// //         </span>
// //       </ModalConfirmacao>
// //     </div>
// //   );
// // };

// // export default TaskList;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import TaskAdd from "./TaskAdd";
import TaskList from "./TaskList";
import { getAllTask } from "../../../apiFrontEnd/tarefas.js";
import BoasVindas from "../../components/BoasVindas";

const Home = ({ usuarioLogado: usuarioLogadoProp, onLogout }) => {
  const navigate = useNavigate();
  const [tasklist, setTasklist] = useState([]);
  const [mostrarBoasVindas, setMostrarBoasVindas] = useState(true);

  // usa o valor da prop se disponível, ou recupera do localStorage
  const usuarioLogado =
    usuarioLogadoProp || JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    if (!usuarioLogado) {
      navigate("/"); // redireciona se não estiver logado
    }
  }, [usuarioLogado, navigate]);

  const carregarTarefas = async () => {
    if (!usuarioLogado) return;

    const todasAsTarefas = await getAllTask();
    console.log("todas as Tarefas carregadas:", todasAsTarefas);

    const tarefasDoUsuario = todasAsTarefas.filter(
      (tarefa) => tarefa.usuarioId === usuarioLogado.usuarioId
    );

    console.log("Tarefas carregadas:", tarefasDoUsuario);
    setTasklist(tarefasDoUsuario);
  };

  useEffect(() => {
    carregarTarefas();
  }, [usuarioLogado]);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarBoasVindas(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header usuarioLogado={usuarioLogado} onLogout={onLogout} />
      <div className="main">
        {mostrarBoasVindas && <BoasVindas nome={usuarioLogado?.nome} />}

        <TaskAdd
          tasklist={tasklist}
          setTasklist={setTasklist}
          usuarioLogado={usuarioLogado}
        />

        <TaskList
          tasklist={tasklist}
          setTasklist={setTasklist}
          carregarTarefas={carregarTarefas}
          usuarioLogado={usuarioLogado}
        />
      </div>
    </>
  );
};

export default Home;
