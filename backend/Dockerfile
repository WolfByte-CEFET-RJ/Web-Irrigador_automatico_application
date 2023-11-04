FROM node:20-alpine

EXPOSE 5000

WORKDIR /home/app

COPY . .

RUN npm install

RUN npm -g nodemon

CMD ["npm", "start"]