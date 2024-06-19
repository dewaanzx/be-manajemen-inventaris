exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name");
    table.string("email");
    table.string("password");
    table.enu("role", ["User", "Admin", "SPV Rooms", "SPV Cars"]);
    table.string("phone");
    table.string("division").nullable();
    table.string("picture").nullable();
    table.string("verification_token").nullable();
    table.enu("status", ["unverified", "verified"]).defaultTo("unverified");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
