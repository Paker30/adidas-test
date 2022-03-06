FROM node:16-alpine
LABEL maintainer "Fran <morenocfrancisco86@gmail.com>"
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci --only=production
EXPOSE 8000
USER node
CMD ["dumb-init", "node", "src/index.js"]
