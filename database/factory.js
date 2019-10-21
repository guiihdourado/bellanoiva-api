/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('Adonis/Acl/Role', (faker, i, data = {}) => {
  return {
    name: 'Administrator',
    slug: 'administrator',
    ...data,
  };
});

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    ...data,
  };
});

Factory.blueprint('App/Models/Event', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    background_color: faker.color(),
    color: faker.color(),
    ...data,
  };
});

Factory.blueprint('App/Models/Photo', (faker, i, data = {}) => {
  return {
    name: `${faker.string({ length: 8, alpha: true })}.jpeg`,
    ...data,
  };
});
