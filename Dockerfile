FROM node as base
COPY . .
RUN npm install && npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=base dist /var/www/html
