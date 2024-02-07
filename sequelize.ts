const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("popmenu", "postgres", "mypass", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate().then(() => {
    console.log(
      "Connection to popmenu database has been established successfully."
    );
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
