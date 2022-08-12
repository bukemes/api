FROM node:16-alpine
LABEL authors="Andrei Lavrenov"

# Create app directory
WORKDIR /app

# This will copy everything from the source path 
COPY ./package*.json .
COPY ./dist ./dist

# update each dependency in package.json to the latest version
RUN npm ci --production

EXPOSE 9001

CMD [ "npm","run","start" ]
# CMD [ "node", "./dist/app.js" ]

# Run the following command to create a Docker image of this project:
# docker build ./ -t elfensky/bukemes-back 

