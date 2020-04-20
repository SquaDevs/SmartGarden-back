FROM node:8.14.1
WORKDIR /usr/app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 8080
CMD [ "yarn","start" ]

