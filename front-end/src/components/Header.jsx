import React from "react";
import Logout from "./Logout";
// import "./Header.css"; // caso queira customizar

const Header = ({ usuarioLogado, onLogout }) => {
  return (
    <header className="header">
      <h1>{usuarioLogado.nome}</h1>

      {usuarioLogado && (
        <div className="header__usuario">
          {/* <span className="header__nome">
            Olá, <strong>{usuarioLogado.nome}</strong>
          </span> */}
          <Logout onLogout={onLogout} />
        </div>
      )}
    </header>
  );
};

export default Header;
