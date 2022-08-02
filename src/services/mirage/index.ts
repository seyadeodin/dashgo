import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    // ActiveModelSerializer -> send and receive data and relations in a single request
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
      //partial allow us to add users with incomplete data if needed
    },

    //factories allow us to create great ammounts of data based on its instructions
    //we can use indexes to numerate our data and differentiate it
    //we can also uso libraries like faker to to generate fake realistic data
    factories: {
      user: Factory.extend({
        name(i:number) {
          return faker.name.firstName();
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10} = request.queryParams;

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
         .users
         .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total)},
          { users }
        )
      });
      this.get('/users/:id');
      this.post('/users');

      //allow us to use /api without causing problems to next api routes
      this.namespace = '';
      //cleans the namespace after instantiate our get and post
      this.passthrough();
      //allow routes that has an api namespace pass through with none is detected on list
    }
  })

  return server;
}