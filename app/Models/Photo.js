/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env');
const Model = use('Model');

class Photo extends Model {
  static get computed() {
    return ['url'];
  }

  getUrl({ name }) {
    return `${Env.get('APP_URL')}/photos/${name}/show`;
  }
}

module.exports = Photo;
