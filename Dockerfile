FROM node:lts-alpine3.19

WORKDIR /

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install -g expo-cli
RUN npm install

COPY . .

EXPOSE 8081

CMD ["expo", "start"]