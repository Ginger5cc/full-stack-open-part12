FROM node:20

WORKDIR /usr/src/app/todo-frontend

COPY ./todo-frontend .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]