exports.up = function(knex, Promise) {
  return knex.schema.createTable('blobs', function(table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blobs');
};
