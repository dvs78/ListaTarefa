import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const ModalConfirmacao = ({
  aberto,
  onConfirmar,
  onCancelar,
  children,
  carregando = false,
  titulo = "Confirmar ação", // valor padrão
}) => {
  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="modal__fundo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="modal__caixa"
            initial={{ y: "-40px", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "-40px", opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 style={{ color: "#333" }}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                style={{ color: "#e74c3c", marginRight: "8px" }}
              />
              {titulo}
            </h2>

            <div className="modal__mensagem">{children}</div>
            <div className="modal__botoes">
              <button
                className="botao confirmar"
                onClick={onConfirmar}
                disabled={carregando}
              >
                {carregando ? "Salvando..." : "Confirmar"}
              </button>
              <button
                className="botao cancelar"
                onClick={onCancelar}
                disabled={carregando}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmacao;
