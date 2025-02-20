FROM node:23
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm install
COPY . ./
