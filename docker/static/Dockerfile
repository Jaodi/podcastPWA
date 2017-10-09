FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 443 80
CMD ["npm", "run", "prod"]