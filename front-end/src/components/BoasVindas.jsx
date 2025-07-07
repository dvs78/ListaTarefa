import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BoasVindas = ({ nome }) => {
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMostrar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.h2 key="boasvindas">
          <p className="boas-vindas">
            Bem-vindo, <strong>{nome}!</strong>{" "}
          </p>
        </motion.h2>
      )}
    </AnimatePresence>
  );
};

export default BoasVindas;
