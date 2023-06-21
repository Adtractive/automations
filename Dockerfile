FROM node:14

# Create app directory
WORKDIR /github/workspace

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --unsafe-perm=true

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
