"use strict";

const mssql = require("mssql");

module.exports = class User {
  constructor(stringConnection) {
    this.stringConnection = stringConnection;
  }

  async connect() {
    return await mssql.connect(this.stringConnection);
  }

  async close() {
    return mssql.close();
  }

  async save({username, photo, rol}) {
    let pool = await this.connect();
    
    let query = `INSERT INTO [estec_tool].[dbo].[user]
        ([estec_tool].[dbo].[user].[username]
        ,[estec_tool].[dbo].[user].[photo]
        ,[estec_tool].[dbo].[user].[rol]) 
    VALUES(
        '${username}',
        '${photo}',
        '${rol}');`;
    
    return await pool.request().query(query);
  }

  async selectByUsername(username) {
    if (username === "" || username === null) {
      return false;
    } else {
      let pool = await this.connect();
      let data = await pool
        .request()
        .query(`select * from [estec_tool].[dbo].[user] where [estec_tool].[dbo].[user].[username]='${username}'`);
      return {
        data: data.recordset,
      };
    }
  } 

};
