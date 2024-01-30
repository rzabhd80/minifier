# Base image: Use the current LTS Node.js Alpine image
FROM node:18-alpine AS builder

RUN chmod a+xrw /opt

# Working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy remaining application code
COPY . .

# Build the NestJS application for production
RUN npm run build

# Second stage: For running the application
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

# Copy built assets from the previous stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

# Install production-only dependencies
RUN npm install --production

# Expose port 3000 (default for NestJS)
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]


# Expose the port that the app will run on
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "start:prod"]
