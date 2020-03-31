FROM mysql:8

ENV MYSQL_DATABASE=foogle
ENV MYSQL_RANDOM_ROOT_PASSWORD=password

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306