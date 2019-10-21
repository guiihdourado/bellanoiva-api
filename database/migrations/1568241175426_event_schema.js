/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventSchema extends Schema {
  up() {
    this.create('events', table => {
      table.increments();
      table.string('name').notNullable();
      table
        .string('slug')
        .notNullable()
        .unique();
      table.string('background_color').notNullable();
      table.string('color').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.integer('limit_print').defaultTo(10);
      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }
}

module.exports = EventSchema;
