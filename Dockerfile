FROM node:20-alpine

RUN apk add --no-cache python3 make g++ sqlite-dev

WORKDIR /app

COPY server/package*.json ./
RUN npm ci --production

COPY server .

EXPOSE 3001
CMD ["npm", "start"]
