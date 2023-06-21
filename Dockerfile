FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm cache clean --force
RUN npm -v
RUN node -v
RUN npm install

# Bundle app source
COPY . .

ENTRYPOINT ["node", "index.js"]
