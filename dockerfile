# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port your app runs on (default for Express is 3000)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
