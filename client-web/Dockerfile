# ==========================================
# STAGE 1: Build Environment
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency specifications
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy web source files
COPY . .

# Build Vite static assets
RUN npm run build

# ==========================================
# STAGE 2: Production Environment (Nginx)
# ==========================================
FROM nginx:1.25-alpine

# Copy built static assets from Stage 1 to Nginx HTML directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for public access
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
