const { Sequelize, DataTypes } = require("sequelize");

// const seq = new Sequelize("asset_db", "root", "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });
const seq = new Sequelize("mysql://root:OLnEjTZIEPTmXqiNVWBTcRMvuWpaCthK@junction.proxy.rlwy.net:47817/railway");

seq
  .authenticate()
  .then((res) => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { sequelize: seq, DataTypes };
