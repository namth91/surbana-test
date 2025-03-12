# STAGE 1: Base Stage (Common Setup)
FROM node:22 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# STAGE 2: Development
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000

# STAGE 3: Production
FROM base AS production
ENV NODE_ENV=production
COPY . .
RUN npm run build
EXPOSE 3000
