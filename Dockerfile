FROM node:12-alpine as builder
WORKDIR /app
RUN apk add --update --no-cache python2 && ln -sf python2 /usr/bin/python
RUN apk add build-base
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/src/.vuepress/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
