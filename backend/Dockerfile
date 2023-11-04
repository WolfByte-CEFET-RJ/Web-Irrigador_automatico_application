FROM node:20-alpine

EXPOSE 5000

WORKDIR /home/app

COPY . .

RUN npm install -g nodemon

RUN npm install

CMD ["npm", "start"]