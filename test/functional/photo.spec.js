const { test, trait } = use('Test/Suite')('Photo');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Helpers = use('Helpers');

test('it should be able to list the photos by event id', async ({
  client,
  assert,
}) => {
  const user = await Factory.model('App/Models/User').create({
    username: 'admin',
    email: 'admin@admin.com',
    password: '123456',
  });

  const eventPayload = {
    name: 'Evento Teste',
    background_color: '#FFFFFF',
    color: '#000',
  };

  const event = await Factory.model('App/Models/Event').create(eventPayload);

  const photoPayload = {
    user_id: user.id,
    event_id: event.id,
  };

  await Factory.model('App/Models/Photo').createMany(5, photoPayload);

  const response = await client.get(`/photos/${event.id}`).end();
  response.assertStatus(200);
  assert.exists(response.body[0].id);
});

test('it should be able to register a photo', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create({
    username: 'client',
    email: 'client@client.com',
    password: '123456',
  });

  const eventPayload = {
    name: 'Evento Teste',
    background_color: '#FFFFFF',
    color: '#000',
  };

  const event = await Factory.model('App/Models/Event').create(eventPayload);

  const response = await client
    .post(`/photos/${event.id}`)
    .attach('image', Helpers.tmpPath('image.jpeg'))
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(201);
});
