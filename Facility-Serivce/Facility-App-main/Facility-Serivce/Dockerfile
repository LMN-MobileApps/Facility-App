FROM node:12.16.1-alpine As builder
#FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --package-lock-only
#RUN npm install
#RUN npm install  --production && mv node_modules ../
# If you are building your code for production
RUN npm ci --only=production

#Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "./dist/server.js" ]