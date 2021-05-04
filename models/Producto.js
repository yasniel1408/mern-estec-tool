"use strict";

const mssql = require("mssql");

module.exports = class Producto {
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
    // initilize all variable
    let columns = [];
    let totalRecords = [];
    let data = [];

    //define index of column name
    columns = ["Id_Producto", "Desc_Producto", "Fecha_Entrada"];
    let where = "";
    let sqlTot = "";
    let sqlRec = "";

    // check alamcen
    if (params.almacen !== "*") {
      where += ` LEFT JOIN [UNE_2955A_INT].[dbo].[Existencia_Lotes] 
      ON [UNE_2955A_INT].[dbo].[Existencia_Lotes].[Id_Producto] = [UNE_2955A_INT].[dbo].[Producto].[Id_Producto]
      WHERE [UNE_2955A_INT].[dbo].[Existencia_Lotes].[Id_Almacen] = '${params.almacen}' `;
    }

    // check search value exist
    if (params.search.value !== "") {
      if (params.almacen !== "*") { 
        where += " AND ";
      }else{
        where += " WHERE ";
      }
      where += " ( [UNE_2955A_INT].[dbo].[Producto].[Id_Producto] LIKE '%" + params["search"]["value"] + "%' ";
      where += " OR [UNE_2955A_INT].[dbo].[Producto].[Desc_Producto] LIKE '%" + params["search"]["value"] + "%' ";
      where += " OR [UNE_2955A_INT].[dbo].[Producto].[Fecha_Entrada] LIKE '%" + params["search"]["value"] + "%' )";
    }

    // getting total number records without any search
    let sql = `select [UNE_2955A_INT].[dbo].[Producto].[Id_Producto],
                      [UNE_2955A_INT].[dbo].[Producto].[Desc_Producto], 
                      [UNE_2955A_INT].[dbo].[Producto].[Fecha_Entrada] 
                      from [UNE_2955A_INT].[dbo].[Producto]`;
    sqlTot += sql;
    sqlRec += sql;

    //concatenate search sql if value exist
    if (where != "") {
      sqlTot += where;
      sqlRec += where;
    }

    sqlRec +=
      " ORDER BY " +
      columns[params["order"][0]["column"]] +
      " " +
      params["order"][0]["dir"] +
      " OFFSET " +
      params["start"] +
      " ROWS FETCH NEXT " +
      params["length"] +
      " ROWS ONLY";

    let queryTot = await pool.request().query(sqlTot);
    totalRecords = queryTot.recordset.length;

    let queryRecords = await pool.request().query(sqlRec);
    data = queryRecords.recordset;

    close()
    return {
      draw: parseInt(params["draw"]),
      recordsTotal: parseInt(totalRecords),
      recordsFiltered: parseInt(totalRecords),
      data: data,
    };
  }

  async selectById(id) {
    if (id == undefined || id === 0) {
      return await this.selectAll();
    } else {
      return new Promise((resolve, reject) => {
        this.connect()
          .then((pool) => {
            return pool
              .request()
              .query(`select * from Producto where id=${id}`);
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
