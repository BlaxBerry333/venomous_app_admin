# Venomous Apps' Admin

|            App Name             |                                                                                                    |  Topic   |  Port  |
| :-----------------------------: | -------------------------------------------------------------------------------------------------- | :------: | :----: |
| [Admin Client](./admin_client/) | [![My Skills](https://skillicons.dev/icons?i=vite,react&perline=4)](https://skillicons.dev)        |   SPA    | `3000` |
| [Admin Server](./admin_server/) | [![My Skills](https://skillicons.dev/icons?i=docker,django&perline=4)](https://skillicons.dev)     | REST API | `8080` |
|         Admin Server DB         | [![My Skills](https://skillicons.dev/icons?i=docker,postgresql&perline=4)](https://skillicons.dev) |    DB    | `5432` |

## 🚀 Local Setup

```shell
% cd venomous_app_admin

# 1. setup environments
% npm install
% make setup

# 2. create admin superuser for Django
# - USERNAME: admin
# - EMAIL: admin@example.com
# - PASSWORD: admin
% make entry CONTAINER=admin_server
root@[CONTAINER_ID]:/app# \
    export DJANGO_SUPERUSER_USERNAME=admin && \
    export DJANGO_SUPERUSER_EMAIL=admin@example.com && \
    export DJANGO_SUPERUSER_PASSWORD=admin && \
    python manage.py createsuperuser --noinput
root@[CONTAINER_ID]:/app# exit

# 3. start client server
% cd admin_client
% yarn start:dev --force
```

## 🛠 Commands

```shell
# server
% make setup                    # setup all containers
% make start-all                # start all containers
% make stop-all                 # stop all containers
% make clean-all                # stop then remove all containers、volumes、images
% make entry [CONTAINER_NAME]   # entry a specify container

# others
% npm run commit                # using interactive options to replace standard command "git commit"
```
