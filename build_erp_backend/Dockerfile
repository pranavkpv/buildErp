# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM node:18
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
