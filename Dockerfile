# Use an official node image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# COPY public/ /app/public
# COPY src/ /app/src
# COPY package.json /app
# COPY package-lock.json /app
COPY . /app

RUN npm install

# RUN npm run build

# Make port 3040 available to the world outside this container
EXPOSE 3040

# Run app.js when the container launches
CMD ["npm", "start"]