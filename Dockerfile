FROM node:lts as dependencies
WORKDIR /lms
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /lms
COPY . .
COPY --from=dependencies /lms/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /lms
ENV NODE_ENV production

COPY --from=builder /lms/public ./public
COPY --from=builder /lms/package.json ./package.json
COPY --from=builder /lms/next.config.js ./next.config.js
COPY --from=builder /lms/.next ./.next
COPY --from=builder /lms/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]