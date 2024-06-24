FROM node:slim
RUN echo collectingdata
ENV DB_HOST=host.docker.internal
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY src ./src
COPY package*.json .
RUN npm install
