// import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Header from "./components/Header";
// import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
// import Toast from "./components/Toast";
// import RotaProtegida from "./components/RotaProtegida"; // ✅ novo

// function App() {
//   const [usuarioLogado, setUsuarioLogado] = useState(null);

//   return (
//     <div className="app__components">
//       <Header />
//       <Routes>
//         <Route
//           path="/"
//           element={<Login setUsuarioLogado={setUsuarioLogado} />}
//         />
//         <Route
//           path="/home"
//           element={
//             <RotaProtegida usuarioLogado={usuarioLogado}>
//               <Home usuarioLogado={usuarioLogado} />
//             </RotaProtegida>
//           }
//         />
//       </Routes>
//       <Toast />
//     </div>
//   );
// }

// export default App;

import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Toast from "./components/Toast";
import { useState } from "react";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const handleLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem("usuarioLogado");
  };

  return (
    <div className="app__components">
      {usuarioLogado && (
        <Header usuarioLogado={usuarioLogado} onLogout={handleLogout} />
      )}
      <Routes>
        <Route
          path="/"
          element={<Login setUsuarioLogado={setUsuarioLogado} />}
        />
        <Route path="/home" element={<Home usuarioLogado={usuarioLogado} />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
