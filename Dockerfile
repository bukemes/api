FROM node:16-alpine
LABEL authors="Andrei Lavrenov"
# update dependencies and install curl
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# This will copy everything from the source path 
# --more of a convenience when testing locally.
COPY . .

# update each dependency in package.json to the latest version
RUN npm install -g npm-check-updates \
    ncu -u \
    npm install \
    npm install express \
    npm install babel-cli \
    npm install babel-preset \
    npm install babel-preset-env

EXPOSE 9001