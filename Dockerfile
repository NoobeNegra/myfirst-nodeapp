FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install --save-dev nodemon
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "nodemon", "-L", "server.js", "localhost", "8080" ]