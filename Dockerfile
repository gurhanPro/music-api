from node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE ${APPLICATION_PORT}

CMD ["npm", "start"]