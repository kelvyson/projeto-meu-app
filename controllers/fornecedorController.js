module.exports = (app, db) => {
  // Criar fornecedor
  app.post("/fornecedores", (req, res) => {
    const { nome, cnpj, endereco, contato } = req.body;
    db.run(
      "INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)",
      [nome, cnpj, endereco, contato],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, nome, cnpj, endereco, contato });
      }
    );
  });

  // Listar fornecedores
  app.get("/fornecedores", (req, res) => {
    db.all("SELECT * FROM fornecedores", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Atualizar fornecedor
  app.put("/fornecedores/:id", (req, res) => {
    const { nome, cnpj, endereco, contato } = req.body;
    db.run(
      "UPDATE fornecedores SET nome=?, cnpj=?, endereco=?, contato=? WHERE id=?",
      [nome, cnpj, endereco, contato, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ atualizado: this.changes });
      }
    );
  });

  // Deletar fornecedor
  app.delete("/fornecedores/:id", (req, res) => {
    db.run("DELETE FROM fornecedores WHERE id=?", req.params.id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deletado: this.changes });
    });
  });
};
