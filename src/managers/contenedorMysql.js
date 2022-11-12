const knex = require("knex");

class ContenedorMysql {
  constructor(options, tableName) {
    this.database = knex(options);
    this.tableName = tableName;
  }
  async getAll() {
    //seleccionamos desde productos
    //data=todos los productos desde la base
    try {
      const data = await this.database.from(this.tableName).select("*");
      //convertimos y que nos traiga solo los valores del Rowdatapaket que viene de knex
      const results = data.map((elm) => ({ ...elm }));
      return results;
    } catch (error) {
      //capturamos errores
      return `hubo un error ${error}`;
    }
  }

  async save(newData) {
    try {
      //esto retorna un id como arr
      const [Id] = await this.database.from(this.tableName).insert(newData);
      return `New Element saved with id ${Id}`;
    } catch (error) {
      return `hubo un error ${error}`;
    }
  }
  async getById(id) {
    try {
      const data = await this.database.from(this.tableName).where("id", id);
      return data;
    } catch (error) {
      return `Hubo un error ${error}`;
    }
  }
}

module.exports = ContenedorMysql;
