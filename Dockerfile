FROM gcr.io/distroless/nodejs24-debian12 AS runtime

WORKDIR /app

COPY package.json /app/
COPY .next/standalone /app/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]