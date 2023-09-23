# Stage 1: Build the application
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma db push 
RUN npx prisma db seed

# stage 2: Copy the application
FROM node:16-alpine
WORKDIR /app

ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=say_lalisa_love_me_lalisa_love_me_hey

COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "dev"]
