import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // limpa o estado do usuário no App
    navigate("/"); // volta para o login
  };

  return (
    <button className="logout__botao" onClick={handleLogout}>
      Sair
    </button>
  );
};

export default Logout;
