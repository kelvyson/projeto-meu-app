module.exports = (app, db) => {
  // Criar
  app.post("/produtos", (req, res) => {
    const { nome, descricao, preco, codigo_barras } = req.body;
    db.run(
      "INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)",
      [nome, descricao, preco, codigo_barras],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, nome, descricao, preco, codigo_barras });
      }
    );
  });

  // Listar
  app.get("/produtos", (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Atualizar
  app.put("/produtos/:id", (req, res) => {
    const { nome, descricao, preco, codigo_barras } = req.body;
    db.run(
      "UPDATE produtos SET nome=?, descricao=?, preco=?, codigo_barras=? WHERE id=?",
      [nome, descricao, preco, codigo_barras, req.params.id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ atualizado: this.changes });
      }
    );
  });

  // Deletar
  app.delete("/produtos/:id", (req, res) => {
    db.run("DELETE FROM produtos WHERE id=?", req.params.id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deletado: this.changes });
    });
  });
};
