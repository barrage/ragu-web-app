FROM nexus.barrage.net:13455/barrage-internal/ubuntu-node20 as build

WORKDIR /app
COPY . .
RUN npm ci
RUN --mount=type=secret,id=auto-devops-vault-build-secrets,dst=/app/.env,uid=10001 npm run build
RUN rm -rf .npmrc

FROM nexus.barrage.net:13455/barrage-internal/ubuntu-node20-prod as final

WORKDIR /app
COPY --from=build /app .
ENV HOST 0.0.0.0
EXPOSE 3000/tcp
CMD [ "node", ".output/server/index.mjs" ]