import { createServer, Factory, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
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
      server.createList('user', 15);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
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