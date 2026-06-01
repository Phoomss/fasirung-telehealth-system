FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency specifications
COPY package*.json ./

# Install packages
RUN npm ci

# Copy mobile source files
COPY . .

# Expose Metro bundler and Expo CLI connection ports
EXPOSE 8081 19000 19001 19002

# Run Expo development server
CMD ["npx", "expo", "start", "--tunnel"]
