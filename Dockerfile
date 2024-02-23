FROM node:latest
WORKDIR /kit
COPY package.json .
RUN npm i
RUN --mount=type=secret,id=,target=/kit/.env
COPY . .
CMD ["node", "."]
