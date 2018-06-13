# web-server

> Nginx configuration templates and start scripts

Templates are used to support nginx configuration using environment variables, which is required in fact to deploy 12-factor applications:  [The Twelwe-Factor App: III. Config](https://12factor.net/config)

In order to generate actual configuration files from templates, run `scripts/run.sh`

```
REDIRECT_URL=google.com ./scripts/run.sh
```

This package is based on [`crabmusket/nginx-12fa`](https://github.com/crabmusket/nginx-12fa) to substitute the variables.

To learn more about the rules for creating nginx configuration templates, see that repository: [`crabmusket/nginx-12fa`](https://github.com/crabmusket/nginx-12fa)

Note there are shell scripts used to run the web server, so it's required to mark them as executable on your side:

```
chmod +x ./scripts/*.sh
```
