# # Stage 1: Development stage
# FROM node:20-alpine as development
# WORKDIR /hotelfrontend

# COPY package.json .
# RUN npm install
# COPY . .

# # Stage 2: Build stage
# FROM development as build

# RUN npm run build

# # Stage 3: Production stage
# FROM node:20-alpine as production

# WORKDIR /hotelfrontend

# COPY --from=build /hotelfrontend/dist ./dist
# COPY package.json .


# RUN npm install -g http-server
# #RUN npm install --only=production

# EXPOSE 3000

# CMD ["npm", "start"]


#//////////////////////////////#


# Step 1: Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files & install deps
COPY package*.json ./
RUN npm install

# Copy all source
COPY . .

# Fix permission issue for scripts
RUN chmod -R +x node_modules/.bin

# Build production (creates dist/)
RUN npm run build

# Step 2: Nginx Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy dist files from build stage
COPY --from=build /app/dist .

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
