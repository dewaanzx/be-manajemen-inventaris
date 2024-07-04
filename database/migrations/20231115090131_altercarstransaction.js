exports.up = function(knex) {
	return knex.schema.renameTable('car_transactions', 'material_transactions');
  };
  
  exports.down = function(knex) {
	return knex.schema.renameTable('material_transactions', 'car_transactions');
  };