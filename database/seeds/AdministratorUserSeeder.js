/*
|--------------------------------------------------------------------------
| AdministratorUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class AdministratorUserSeeder {
  async run() {
    const user = await Factory.model('App/Models/User').create({
      username: 'admin',
      email: 'admin@admin.com',
      password: '123456',
    });

    const role = await Factory.model('Adonis/Acl/Role').make({
      description: 'Administrator Role',
    });

    await user.roles().save(role);
  }
}

module.exports = AdministratorUserSeeder;
