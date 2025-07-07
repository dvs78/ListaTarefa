// API significa Application Programing interface
import express from "express";
import cors from "cors";
import "dotenv/config";
// import DbClass from "../crud/dbOnline/DbClass.js"; // 👈 importação correta
import rotaTarefas from "../crud/rotas/rotaTarefas.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log("__dirname", __dirname);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// CRIAR A ROTA GET QUE IRÁ COMUNICAR O DB COM SERVIDOR
// app.get("/", async (req, res) => {
//   const result = await new DbClass().getAll("tarefas");
//   res.status(200).send(result);
// });

app.use("/api/tarefas", rotaTarefas);

app.use(express.static(path.join(__dirname, "../../front-end/dist")));

app.get("*any", (req, res) => {
  res.sendFile(path.join(__dirname, "../../front-end/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
