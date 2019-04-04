FROM mhart/alpine-node:base-8.9.0
WORKDIR /source

# Provide manifest file
ADD manifest.json manifest.json

# Provide executable
ADD index.js index.js

# Provide server side transpiled code
ADD build src

# Provide publicly served files
ADD public public

# Provide modules
ADD node_modules node_modules

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "."]
