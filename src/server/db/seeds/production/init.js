
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('blobs').del(),

    // Inserts seed entries
    knex('blobs').insert({
      firstName: 'Michael',
      lastName: 'Herman'
    })
  );
};
