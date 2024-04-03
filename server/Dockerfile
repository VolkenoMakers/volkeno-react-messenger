# Dockerfile
FROM node:alpine

RUN mkdir -p /usr/src/server

WORKDIR /usr/src/server

COPY package.json /usr/src/server

RUN yarn install

COPY . /usr/src/server

RUN npm install -g nodemon 

RUN chown -R node:node node_modules


CMD ["yarn", "run", "start"]