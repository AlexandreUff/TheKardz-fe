# build step
FROM node
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["node", "src/index.js"]
