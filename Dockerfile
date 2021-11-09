FROM node:16 as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run gridsome build

FROM nginx:alpine
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
