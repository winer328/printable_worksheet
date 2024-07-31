FROM node:14-alpine
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
