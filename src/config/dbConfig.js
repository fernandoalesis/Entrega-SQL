//path es propio de node
//nos permite unir diferentes rutas para ubicarnos bien en la carpeta
const path = require("path");
const options = {
  mariadb: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "coderhousedb",
    },
  },
  sqliteDB: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../DB/chatDB.sqlite"),
    },
  },
};

module.exports = options;
