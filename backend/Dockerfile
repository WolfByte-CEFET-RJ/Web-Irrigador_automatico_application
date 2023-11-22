FROM node:20-alpine

WORKDIR /home/app

COPY . .

RUN npm install -g nodemon

RUN npm install

CMD ["npm", "start"]