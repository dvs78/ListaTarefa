import { Navigate } from "react-router-dom";

const RotaProtegida = ({ usuarioLogado, children }) => {
  if (!usuarioLogado) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RotaProtegida;
