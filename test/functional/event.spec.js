const { test, trait } = use('Test/Suite')('Event');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

test('it should be able to register an event', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create({
    username: 'admin',
    email: 'admin@admin.com',
    password: '123456',
  });
  const role = await Factory.model('Adonis/Acl/Role').make();

  await user.roles().save(role);

  const eventPayload = {
    name: 'Evento Teste',
    background_color: '#FFFFFF',
    color: '#000',
  };

  const response = await client
    .post('/events')
    .send(eventPayload)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    name: 'Evento Teste',
    slug: 'evento-teste',
    background_color: '#FFFFFF',
    color: '#000',
  });
});

test('it should be able to return an event', async ({ client }) => {
  const eventPayload = {
    name: 'Evento Teste',
    slug: 'evento-teste',
    background_color: '#FFFFFF',
    color: '#000',
  };

  await Factory.model('App/Models/Event').create(eventPayload);

  const response = await client.get(`/events/${eventPayload.slug}`).end();

  response.assertStatus(200);

  response.assertJSONSubset(eventPayload);
});
