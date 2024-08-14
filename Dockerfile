FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

RUN npm rebuild bcrypt --build-from-source

FROM node:14-slim
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY . .
CMD ["npm", "start"]
