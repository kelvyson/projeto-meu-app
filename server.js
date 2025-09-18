const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// middlewares
app.use(cors());
app.use(express.json());

// conexão SQLite
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

// criação de tabelas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    preco REAL,
    codigo_barras TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cnpj TEXT,
    endereco TEXT,
    contato TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS produto_fornecedor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER,
    fornecedor_id INTEGER,
    FOREIGN KEY(produto_id) REFERENCES produtos(id),
    FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id)
  )`);
});

// rotas básicas
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

require("./controllers/produtoController")(app, db);
require("./controllers/fornecedorController")(app, db);
require("./controllers/produtoFornecedorController")(app, db);
