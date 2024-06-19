const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  return await knex("users").insert([
    {
      name: "Fitrah Firdaus",
      email: "fitrahf87@gmail.com",
      password: await bcrypt.hash("123", 10),
    },
  ]);
};
