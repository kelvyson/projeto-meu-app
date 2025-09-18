module.exports = (app, db) => {
  // Associar produto a fornecedor
  app.post("/produto-fornecedor", (req, res) => {
    const { produto_id, fornecedor_id } = req.body;
    db.run(
      "INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)",
      [produto_id, fornecedor_id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, produto_id, fornecedor_id });
      }
    );
  });

  // Listar fornecedores de um produto
  app.get("/produto-fornecedor/produto/:produto_id", (req, res) => {
    db.all(
      `SELECT f.* FROM fornecedores f
       JOIN produto_fornecedor pf ON f.id = pf.fornecedor_id
       WHERE pf.produto_id = ?`,
      [req.params.produto_id],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  // Listar produtos de um fornecedor
  app.get("/produto-fornecedor/fornecedor/:fornecedor_id", (req, res) => {
    db.all(
      `SELECT p.* FROM produtos p
       JOIN produto_fornecedor pf ON p.id = pf.produto_id
       WHERE pf.fornecedor_id = ?`,
      [req.params.fornecedor_id],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  // Remover associação
  app.delete("/produto-fornecedor/:id", (req, res) => {
    db.run("DELETE FROM produto_fornecedor WHERE id=?", req.params.id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deletado: this.changes });
    });
  });
};
