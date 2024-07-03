exports.up = function(knex) {
	return knex.schema.renameTable('cars', 'materials');
  };
  
  exports.down = function(knex) {
	return knex.schema.renameTable('materials', 'cars');
  };