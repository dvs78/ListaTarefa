import pool from "./db.js";

class DbClass {
  // Pegar tudo
  // async getAll(table, columns = ["*"]) {
  //   const colStr = columns.map((col) => `"${col}"`).join(", "); // Protege nomes de colunas
  //   try {
  //     const results = (await pool.query(`SELECT ${colStr} FROM "${table}"`))
  //       .rows;
  //     return results;
  //   } catch (error) {
  //     console.error(
  //       `Erro ao buscar dados da tabela '${table}':`,
  //       error.message
  //     );
  //     return [];
  //   }
  // }

  // Pegar tudo por ID
  async getByID(table, field, value, columns = ["*"]) {
    const colStr = columns.map((col) => `"${col}"`).join(", ");
    try {
      const query = `SELECT ${colStr} FROM "${table}" WHERE "${field}" = $1`;
      const result = await pool.query(query, [value]);
      return result.rows;
    } catch (error) {
      console.error(`Erro ao buscar ${field}:`, error.message);
      throw error;
    }
  }

  // Deletar por ID
  async deleteById(tabela, id) {
    try {
      const queryText = `DELETE FROM "${tabela}" WHERE id = $1`;
      const result = await pool.query(queryText, [id]);
      return result.rowCount > 0; // Retorna se algo foi deletado
    } catch (error) {
      console.error("Erro ao deletar:", error.message);
      throw error;
    }
  }

  // Inserir tarefa
  async insertTask(tabela, dados) {
    console.log("Tentando inserir no banco:", dados);

    try {
      const colunas = Object.keys(dados);
      const valores = Object.values(dados);

      const placeholders = colunas.map((_, i) => `$${i + 1}`).join(", ");
      const colunasFormatadas = colunas.map((col) => `"${col}"`).join(", ");

      const query = `INSERT INTO "${tabela}" (${colunasFormatadas}) VALUES (${placeholders}) RETURNING *`;

      const result = await pool.query(query, valores);
      return result.rows[0]; // Retorna o registro inserido
    } catch (error) {
      console.error("Erro ao inserir tarefa:", error.message);
      throw error;
    }
  }

  // Atualizar tarefa por ID
  async updateById(tabela, id, dados) {
    try {
      const colunas = Object.keys(dados);
      const valores = Object.values(dados);

      const sets = colunas
        .map((col, idx) => `"${col}" = $${idx + 1}`)
        .join(", ");

      const query = `UPDATE "${tabela}" SET ${sets} WHERE id = $${
        colunas.length + 1
      } RETURNING *`;

      const result = await pool.query(query, [...valores, id]);
      return result.rows[0]; // retorna o registro atualizado
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error.message);
      throw error;
    }
  }
}

export default DbClass;
