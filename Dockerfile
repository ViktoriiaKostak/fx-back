FROM node:20.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm uninstall nodemailer

RUN npm install nodemailer


COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 6969

CMD ["npm", "run", "start:dev"]