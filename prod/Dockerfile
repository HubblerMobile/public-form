FROM public.ecr.aws/a8d2h0z7/node-1680-alpine311:latest AS ui-build
RUN apk add g++ make python

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src/app/forms
ENV PATH /app/node_modules/.bin:$PATH
COPY ../ ./
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install
RUN npm run build


FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./.nginx/forms.conf /etc/nginx/conf.d/forms.conf
COPY ./.nginx/ssl/hubbler.crt.pem /etc/nginx/hubbler.crt.pem
COPY ./.nginx/ssl/hubbler.key.pem /etc/nginx/hubbler.key.pem

RUN ls -la /etc/nginx

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=ui-build /usr/src/app/forms/build /usr/share/nginx/html/forms
COPY --from=ui-build /usr/src/app/forms/build /etc/nginx/html
COPY --from=ui-build /usr/src/app/forms/build /etc/nginx/html/forms

RUN chmod -R 755 /usr/share/nginx/html/forms
RUN chmod -R 755 /etc/nginx/html
RUN chmod -R 755 /etc/nginx/html/forms

RUN ls -la /usr/share/nginx/html/forms
RUN ls -la /etc/nginx/html
RUN ls -la /etc/nginx/html/forms
#RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
