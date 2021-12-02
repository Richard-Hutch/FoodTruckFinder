#!/usr/bin/env bash
# Determine the correct file env to use and execute the appropriate yarn command.

# -n returns TRUE if the length of STRING is nonzero; need to prepend non-null env names with a '.' for file path
# Bash equivalent of ENV_NAME = !StringUtils.isEmpty(ENV_NAME) ? {"."+ENV_NAME} : ENV_NAME;
[[ -n $ENV_NAME ]] && ENV_NAME=".${ENV_NAME}"

exec ./node_modules/.bin/env-cmd -f "./.env${ENV_NAME}" yarn start

#exec ./node_modules/.bin/env-cmd -f "./.env${ENV_NAME}" yarn start
#exec ./ -f "./.env${ENV_NAME}" yarn start