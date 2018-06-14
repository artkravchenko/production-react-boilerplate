import request from 'supertest';
import { createApplication } from '../app.js';

describe('app.js', () => {
  describe('application', () => {
    const app = createApplication();

    describe('GET /hello', () => {
      it('responds with 200 status code', () => {
        return request(app)
          .get('/hello')
          .expect(200);
      });

      it('responds with "Hello, world!" title', () => {
        return request(app)
          .get('/hello')
          .expect(res => {
            if (!res.text.includes('<title>Hello, world!</title>')) {
              throw new Error('"Hello, world!" HTML title is missing');
            }
          });
      });
    });
  });
});
