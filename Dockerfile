FROM node:14

# Create app directory
WORKDIR /github/workspace

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm cache clean --force
RUN npm ci

# Bundle app source
COPY . .

ENTRYPOINT ["node", "index.js"]
