FROM node:21-alpine

WORKDIR /app

# Copy the application code 
COPY . .

# Install PNPM
RUN npm install -g pnpm

# Install dependencies
RUN pnpm i 

# Build the TypeScript code
RUN pnpm run build

# Migrate prisma
RUN npx prisma migrate deploy

# Start the application
CMD ["pnpm", "start"]