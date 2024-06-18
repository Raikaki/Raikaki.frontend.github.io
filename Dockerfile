# First stage: build the React application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm start


# Second stage: serve the application using a web server (optional)
FROM nginx:alpine

# Copy the built application from the first stage to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the application will run on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
