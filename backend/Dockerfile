# Build stage
FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 1955
RUN npm run build
CMD ["npm","run", "serve"]