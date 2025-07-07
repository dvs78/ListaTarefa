import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuario } from "../../assets/database/usuario.js";
import { notificar } from "../../components/Toast";

const Login = ({ setUsuarioLogado }) => {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const encontrado = usuario.find((u) => u.senha === senha);

    if (encontrado) {
      const user = {
        usuarioId: encontrado.usuarioId,
        nome: encontrado.nome,
        email: encontrado.email,
      };
      setUsuarioLogado(user);
      localStorage.setItem("usuarioLogado", JSON.stringify(user));

      navigate("/home");
    } else {
      notificar("erro", "Senha inválida");
    }
  };

  return (
    <div className="login__container">
      <h1>Login</h1>
      <label className="label__login" htmlFor="input__login">
        Digite sua senha:
      </label>
      <input
        type="password"
        name="input__login"
        placeholder="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button className="btn__enter" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
};

export default Login;
