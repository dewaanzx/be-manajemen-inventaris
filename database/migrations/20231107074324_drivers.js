exports.up = function (knex) {
  return knex.schema.createTable("drivers", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name");
    table.string("picture");
    table.enu("availability", ["0", "1"]).defaultTo("1");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("drivers");
};
