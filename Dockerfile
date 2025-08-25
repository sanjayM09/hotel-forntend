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
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Nginx Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist .
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
