FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package*.json ./

FROM base as build
RUN npm install

COPY . .
RUN npx prisma generate
RUN npx prisma db push
RUN npx prisma db seed

RUN npm run build

FROM base as prod-build

RUN npm install --production
COPY prisma prisma
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

EXPOSE 3000
CMD ["npm", "run", "start"]