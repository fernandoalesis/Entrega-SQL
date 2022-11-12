const options = require("../config/dbConfig");

const knex = require("knex");

//crear bases

const dbmysql = knex(options.mariadb);
const dbSqlite = knex(options.sqliteDB);
//datos de knex vienen como promesas(asincronos)

const createTables = async () => {
  try {
    //si existe eliminamos tabla sino creamos
    const tableProductsExists = await dbmysql.schema.hasTable("products");
    if (tableProductsExists) {
      await dbmysql.schema.dropTable("products");
    }
    await dbmysql.schema.createTable("products", (table) => {
      //campos de la tabla products
      table.increments("id");
      table.string("title", 40).nullable(false); //titulo no puede ser nulo
      table.integer("price");
      table.string("thumbnail", 200);
    });
    console.log("table products created succesfully");
    dbmysql.destroy();

    //ChatDB

    const tableChatsExists = await dbSqlite.schema.hasTable("chat");
    if (tableChatsExists) {
      await dbSqlite.schema.dropTable("chat");
    }
    await dbSqlite.schema.createTable("chat", (table) => {
      //todo igual, definimos tabla de chat
      table.increments("id");
      table.string("user", 30);
      table.string("timestamp", 10);
      table.string("message", 200);
    });
    console.log("Chat table created");
    dbSqlite.destroy();
  } catch (error) {
    console.log(error);
  }
};

createTables();
