# ==========================================
# STAGE 1: Build Environment
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency specifications
COPY package*.json ./

# Install all dependencies (including devDependencies for compilation)
RUN npm ci

# Copy source code and database configurations
COPY . .

# Generate the Prisma database client
RUN npx prisma generate

# ==========================================
# STAGE 2: Production Environment
# ==========================================
FROM node:20-alpine

WORKDIR /usr/src/app

# Set production environment node flag
ENV NODE_ENV=production

# Copy dependency specifications
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled Prisma clients from Stage 1
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

# Copy source code
COPY . .

# Expose API service port
EXPOSE 8080

# Execute server startup script
CMD ["npm", "start"]
