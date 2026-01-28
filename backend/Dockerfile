FROM node:25-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json .
RUN npm ci --omit-dev

FROM base AS dev-deps
COPY package*.json .
RUN npm ci

FROM base AS build
COPY package*.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM dev-deps AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]


FROM base AS prod
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/src/index.js"]



