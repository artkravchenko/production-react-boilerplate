#!/bin/bash

script_path="$(cd "$(dirname "$0")" ; pwd -P)"
nginx_resources_path="$(cd ${script_path}/../resources/nginx ; pwd -P)"

for filename in $nginx_resources_path"/templates/*.template.conf"; do
  ${script_path}/subenv.sh "${filename}" \
    "${nginx_resources_path}/$(basename ${filename} .template.conf).conf"
done

nginx -c "${nginx_resources_path}/nginx.conf" -g "daemon off;" "$@"
