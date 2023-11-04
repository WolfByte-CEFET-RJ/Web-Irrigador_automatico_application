FROM node:20-alpine

EXPOSE 19006

WORKDIR /home/app

COPY . .

RUN npm install -g expo-cli

RUN npm install

CMD ["npm", "run", "start-docker"]