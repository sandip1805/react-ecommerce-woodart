# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install all dependencies, including devDependencies
RUN npm install --omit=optional

# Install nodemon globally to ensure it's available
RUN npm install -g nodemon
# Copy the rest of the application
COPY . .

# Expose port 3001 for the Node.js server
EXPOSE 3001

# Start the server
CMD ["npm", "run", "dev"]
