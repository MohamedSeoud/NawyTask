# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies, including Prisma
RUN npm install

# Install the latest version of Prisma CLI globally
RUN npm install -g prisma

# Copy the prisma directory to the working directory
COPY prisma ./prisma

# Copy the rest of the application files to the working directory
COPY . .

# Set environment variable to ignore missing checksums
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Clean up cached Prisma engines
RUN rm -rf node_modules/.prisma

# Generate Prisma client
RUN npx prisma generate

# Expose port 4000
EXPOSE 4000

# Command to run the application
CMD ["npx", "ts-node", "src/index.ts"]
