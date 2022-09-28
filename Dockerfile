# base image from dockerhub
FROM node:16.17.0

# set docker image directory inside the container
WORKDIR /client

# copy package.json to root of working directory (/client)
COPY package.json .

# install dependencies
RUN npm install

# copy everything to work directory
COPY . .

# expose port
EXPOSE 3000

# entry command to start container
CMD [ "npm", "start" ]
