// migrations/XXXXXXXXXXXXXX-add-user-id-to-job-applications.js
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // adding column of foreign key UserId to posts table;; foreign key capital letter UserId
    await queryInterface.addColumn("posts", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users", // you can use the table name here not model
        key: "id", // primary key
      },
      onUpdate: "CASCADE", //
      onDelete: "SET NULL", //
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts", "UserId");
  },
};
