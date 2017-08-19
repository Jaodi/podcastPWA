FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 4000
# CMD ["node", "./node_modules/http-server/bin/http-server", "build", "-p", "3000"]
CMD ["npm", "run", "api"]