const Helpers = use('Helpers');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Photo = use('App/Models/Photo');

class PhotoController {
  async index({ params }) {
    const { eventId } = params;

    const photos = await Photo.query()
      .where('event_id', eventId)
      .fetch();

    return photos;
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.name}`));
  }

  async store({ request, response, auth, params }) {
    const validationOptions = {
      types: ['image'],
      size: '10mb',
      extnames: ['png', 'jpg', 'jpeg'],
    };

    const image = request.file('image', validationOptions);
    // eslint-disable-next-line camelcase
    const { eventId } = params;
    const userLogged = await auth.getUser();
    const filename = `${new Date().getTime()}.${image.subtype}`;

    await image.move(Helpers.tmpPath('uploads'), {
      name: filename,
    });

    if (!image.moved()) {
      throw image.error();
    }

    const photo = await Photo.create({
      name: filename,
      event_id: eventId,
      user_id: userLogged.id,
    });

    return response.status(201).json(photo);
  }
}

module.exports = PhotoController;
