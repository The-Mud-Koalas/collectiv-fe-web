FROM ubuntu:20.04

RUN apt-get update -y && \
    apt-get install curl aptitude -y && \
    curl -s https://deb.nodesource.com/setup_16.x | bash && \
    apt-get update -y && apt-get install nodejs -y && \
    aptitude install npm -y && \
    rm -rf /var/lib/apt/lists/*

COPY . .
RUN npm install && \
    npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]