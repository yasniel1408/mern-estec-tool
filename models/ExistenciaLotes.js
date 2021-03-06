"use strict";

const mssql = require("mssql");

module.exports = class Sql {
  constructor(stringConnection) {
    this.stringConnection = stringConnection;
  }

  connect() {
    mssql.on("error", (err) => {
      console.log(err);
      mssql.close();
    });

    return mssql.connect(this.stringConnection);
  }

  close() {
    return mssql.close();
  }

  async selectAll() {
    let pool = await this.connect();
    let data = await pool.request().query(`select * from Existencia_Lotes`);
    close()
    return {
      data: data.recordset,
    };
  }

  async selectById(id) {
    if (id == undefined || id === 0) {
      return this.selectAll();
    } else {
      let pool = await this.connect();
      let data = await pool
        .request()
        .query(`select * from Existencia_Lotes where Id_Producto='${id}'`);
      return {
        data: data.recordset,
      };
    }
  }

  async execStoreProcedure(storeProcedure) {
    return new Promise((resolve, reject) => {
      this.connect()
        .then((pool) => {
          return pool.request().execute(storeProcedure);
        })
        .then((result) => {
          mssql.close();
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async execStoreProcedureById(storeProcedure, parameter) {
    return new Promise((resolve, reject) => {
      this.connect()
        .then((pool) => {
          return pool
            .request()
            .input("id", mssql.Int, parameter)
            .execute(storeProcedure);
        })
        .then((result) => {
          mssql.close();
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
