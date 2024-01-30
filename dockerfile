# Base image: Use the current LTS Node.js Alpine image
FROM node:18-alpine AS builder

RUN chmod a+xrw /opt

# Working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining application code
COPY . .

# Build the NestJS application for production
RUN npm run build

# Second stage: For running the application
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built assets from the previous stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install production-only dependencies
RUN npm ci --only=production

# Expose port 3000 (default for NestJS)
EXPOSE 3000

# Start the NestJS application
CMD ["nest", "start"]
