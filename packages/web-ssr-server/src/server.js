import http from 'http';

import { createApplication } from './app';

const { SSR_SERVER_HOSTNAME, SSR_SERVER_PORT } = process.env;

const app = createApplication();

const server = http.createServer(app);

server.listen(SSR_SERVER_PORT, SSR_SERVER_HOSTNAME, () => {
  console.log(
    'Server is running at ' + `http://${SSR_SERVER_HOSTNAME}:${SSR_SERVER_PORT}`
  );
});
