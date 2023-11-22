FROM node:v16.18

WORKDIR /Microservices--TypeScript

COPY . .

RUN npm install
RUN npm run build

CMD [ "node", "build/index.js" ]

EXPOSE 5000