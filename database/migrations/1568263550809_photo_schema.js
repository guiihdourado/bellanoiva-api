/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PhotoSchema extends Schema {
  up() {
    this.create('photos', table => {
      table.increments();
      table.string('name');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable();
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('photos');
  }
}

module.exports = PhotoSchema;
