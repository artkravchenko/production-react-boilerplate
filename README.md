# Production React Boilerplate

The boilerplate is intended to be the only solution you should take to start your fast-growing production web project with React ecosystem and Node.js under the hood.

Without need to remake the application from scratch in the nearest future, when high-load comes to play.

You just have `webpack` and friends pre-configured and well-explained for efficient usage without mess.

**Warning:** the boilerplate isn't stable yet and there're incomplete stages of development. That said, it isn't recommended to use the project at production until `v1.0.0` is released. 

## Development status

#### Hot-reloading

  - [x] hot-reload client-side bundle;
  - [x] hot-reload SSR;
  - [ ] hot-reload API server;
  - [ ] hot-reload shared resources (i18n especially);

#### Build time

  - [ ] speed up rebuild of client-side at development;
  - [ ] speed up rebuild of server-side at development;
  - [ ] speed up production builds of client and server side bundles;

#### Client-side static resources optimization

  - [ ] use http/2 on SSR server;
  - [ ] use gzip/Zopfli/Brotli;
  - [ ] use WebP images;
  - [ ] minify static HTML-templates;
  - [ ] minify React.renderToString() output (optionally);
  - [ ] track changes of the bundles' sizing over time;

#### Flexibility
  
  - [ ] isolate both ends' build and launch pipelines;
  - [ ] support running only API or SSR;
  - [ ] support extensibility and allow overriding everything (scripts);
  - [ ] handle different release stages (development, uat, production);
  - [ ] support running API and SSR with shared port and process attached;

#### Testing

  - [ ] provide API unit and integration testing pipeline;
  - [ ] provide client-side (React components especially) unit and integration testing pipeline;
  - [ ] provide system testing pipeline;
  - [ ] collect test coverage statistics of both client and server sides modules;

#### Maintainability

  - [x] provide JavaScript linting tools configured for client and server sides to share the same code style;
  - [x] provide tools to fix code style issues automatically;
  - [x] perform linting, incorrect code formatting fixing and testing as pre-configured commit hooks;
  - [ ] provide easy to use and semantically correct project structure;
  - [ ] follow the best practices and guidelines of modern JavaScript web development;
  - [x] configure the binding to CI services;
  - [ ] provide contribution guidelines to organize an open-source project;
  - [ ] provide comments and documentation of boilerplate's modules;
  - [ ] write notes about architectural solutions and the ways to improve and powerfully customize the project;
  - [ ] provide ways to collect client and server sides logs and errors;

#### SEO

  - [ ] provide efficient methods to manage metadata and boost search engines adaptivity;

#### Administration, DevOps, and management

  - [ ] write tips about or provide possible ways to manage translations at runtime, without rebuild and restart the application;
  - [ ] provide ways to reduce release preparation time;
  - [ ] provide methods to organize release pipeline powerfully and to increase overall uptime of application being under active development;

#### Performance

## License

React Production Boilerplate is [MIT licensed](LICENSE.md).
