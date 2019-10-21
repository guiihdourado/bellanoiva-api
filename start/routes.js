/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('/sessions', 'SessionController.store');

Route.get('/events/:slug', 'EventController.show');
Route.get('/photos/:eventId', 'PhotoController.index');

Route.get('/photos/:name/show', 'PhotoController.show');

Route.group(() => {
  Route.post('/photos/:eventId', 'PhotoController.store');
}).middleware(['auth']);

Route.group(() => {
  Route.post('/events', 'EventController.store').validator('StoreEvent');
}).middleware(['auth', 'is:administrator']);
