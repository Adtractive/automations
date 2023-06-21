FROM node:14

COPY . .

RUN npm ci

ENTRYPOINT ["node", "index.js"]