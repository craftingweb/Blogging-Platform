"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // adding column of foreign key UserId to posts table;; foreign key capital letter UserId
    await queryInterface.addColumn("comments", "PostId", {
      type: Sequelize.INTEGER,
      references: {
        model: "posts", // you can use the table name here not model
        key: "id", // primary key
      },
      onUpdate: "CASCADE", //
      onDelete: "SET NULL", //
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("comments", "UserId");
  },
};
