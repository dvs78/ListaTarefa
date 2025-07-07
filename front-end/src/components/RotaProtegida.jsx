// import { Navigate } from "react-router-dom";

// const RotaProtegida = ({ usuarioLogado, children }) => {
//   if (!usuarioLogado) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// export default RotaProtegida;

// ProtectedRoute.jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const RotaProtegida = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RotaProtegida;
