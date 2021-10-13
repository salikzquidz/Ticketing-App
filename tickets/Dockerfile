FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

COPY . . /app/

CMD [ "npm", "start" ]