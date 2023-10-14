FROM node:18.18-alpine

COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]