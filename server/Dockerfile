FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

COPY /.env .

EXPOSE 5500

CMD ["npm", "run", "start"]