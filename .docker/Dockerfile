# ==================================
FROM node:20-alpine AS base

# Workdir
WORKDIR /app

# ==================================
FROM base AS builder

# install some pkgs
RUN apk add --no-cache build-base linux-headers libudev-zero python3 libc6-compat

# Copy & install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
RUN yarn add sharp --ignore-engines

# Copy source code & build
COPY . .
RUN yarn build

# ==================================
FROM base

# Copy source built FE
COPY ./next.config.mjs ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Env default
ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0
ENV PORT 3000

# Export port
EXPOSE 3000

# Start app
CMD ["node", "server.js"]