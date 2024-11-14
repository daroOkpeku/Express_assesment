const { Sequelize, DataTypes } = require("sequelize");

// const seq = new Sequelize("asset_db", "root", "", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });
const seq = new Sequelize("mysql://root:EoAEXUMTXrhKuhNRWjgseywdgwcSkgRs@junction.proxy.rlwy.net:45497/railway");

seq
  .authenticate()
  .then((res) => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { sequelize: seq, DataTypes };
