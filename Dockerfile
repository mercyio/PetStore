# FROM node:lts-alpine
  
FROM node:21

# ENV NODE_ENV=production

WORKDIR /usr/src/app

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# RUN npm install --production --silent && mv node_modules ../

COPY . .

RUN npm install 

RUN npm run build 

RUN rm -rf ./src 



EXPOSE 9000
# RUN chown -R node /usr/src/app
# USER node

# npm run start:prod
CMD ["npm", "run","start:prod"]


# FROM baseImage