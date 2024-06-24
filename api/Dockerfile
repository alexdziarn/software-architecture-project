FROM node:slim
ENV DB_HOST=host.docker.internal
RUN mkdir /home/node/api
WORKDIR /home/node/api
COPY src ./src
COPY package*.json .
RUN npm install
CMD ["npm", "run", "start"]
