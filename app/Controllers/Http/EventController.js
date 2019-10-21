/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event');

class EventController {
  async store({ request, response }) {
    const body = request.post();

    const event = await Event.create(body);

    return response.status(201).json(event);
  }

  async show({ params }) {
    const { slug } = params;
    const event = await Event.findByOrFail('slug', slug);

    return event;
  }
}

module.exports = EventController;
