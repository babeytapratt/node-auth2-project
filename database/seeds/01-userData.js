
exports.seed = function(knex) {
  // 00-cleanup.js already cleaned out all tables


  const departments = [
    {
      name: 'sales', // will get id 1
    },
    {
      name: 'information technology', // will get id 2
    },
    {
      name: 'customer service', // will get id 3
    }
  ]
  return knex('departments')
    .insert(departments)
    .then(() => console.log('\n== Seed data for departments table added. ==\n'))
};
