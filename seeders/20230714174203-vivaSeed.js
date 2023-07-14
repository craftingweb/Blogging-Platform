"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Vitali",
          email: "vitali@vitali.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bcrypt.hash("password", 10),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);

    const userId = users[0][0].id;

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Travel",
          description: "Rio de Janeiro",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userId,
        },
      ],
      {}
    );
    //
    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);

    const postId = posts[0][0].id;

    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content:
            "Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, 38m Christ the Redeemer statue atop Mount Corcovado and for Sugarloaf Mountain, a granite peak with cable cars to its summit.",
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: userId,
          PostId: postId,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  },
};
