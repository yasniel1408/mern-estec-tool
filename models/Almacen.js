"use strict";

const mssql = require("mssql");

module.exports = class Almacen {
  constructor(stringConnection) {
    this.stringConnection = stringConnection;
  }

  async connect() {
    return mssql.connect(this.stringConnection);
  }

  async close() {
    return mssql.close();
  }

  async selectAll(params) {
    let pool = await this.connect();
    let data = await pool.request().query(`SELECT TOP 1000 [Id_Almacen], [Desc_Almacen] FROM [UNE_2955A_INT].[dbo].[Almacen]`);
    return {
      data: data.recordset,
    };
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
