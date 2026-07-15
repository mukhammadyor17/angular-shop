FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:latest
COPY --from=builder /app/browser/browser /app/browser
COPY Caddyfile /app/Caddyfile
EXPOSE 3000
CMD ["caddy", "run", "--config", "/app/Caddyfile", "--adapter", "caddyfile"]
