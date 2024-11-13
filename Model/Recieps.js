const { sequelize, DataTypes } = require("../DB/connect");

const Recieps = sequelize.define("recieps", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servings: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instructions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Database and table created!");
  })
  .catch((err) => {
    console.error("Error creating database and table:", err);
  });

module.exports = Recieps;
