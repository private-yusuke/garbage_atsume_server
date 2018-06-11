FROM node

ENV BACK_PORT 8080
ENV GATSUME_DB_PATH "/app/db/scores.db"

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

#CMD ["bash"]

CMD ["node", "/app/app/app.js"]
