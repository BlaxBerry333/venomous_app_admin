# Venomous Apps' Admin

|            App Name             |                                                                                                                |  Topic   |  Port  |
| :-----------------------------: | -------------------------------------------------------------------------------------------------------------- | :------: | :----: |
| [Admin Client](./admin_client/) | [![My Skills](https://skillicons.dev/icons?i=vite,react&perline=4&theme=light)](https://skillicons.dev)        |   SPA    | `3000` |
| [Admin Server](./admin_server/) | [![My Skills](https://skillicons.dev/icons?i=docker,django&perline=4&theme=light)](https://skillicons.dev)     | REST API | `8080` |
|         Admin Server DB         | [![My Skills](https://skillicons.dev/icons?i=docker,postgresql&perline=4&theme=light)](https://skillicons.dev) |    DB    | `5432` |
|      Admin Server Redis DB      | [![My Skills](https://skillicons.dev/icons?i=docker,redis&perline=4&theme=light)](https://skillicons.dev)      |    DB    | `6379` |

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

# 3. start all containers & start client server
% make start-all
```

## 🛠 Commands

```shell
# Containers
% make setup                    # setup all containers
% make build                    # build images of all containers
% make start-all                # start all containers & start client server
% make stop-all                 # stop all containers
% make clean-all                # stop then remove all containers、volumes、images
% make entry [CONTAINER_NAME]   # entry a specify container
% make restart [CONTAINER_NAME] # restart a specific container

# Others
% npm run commit                # using interactive options to replace standard command "git commit"
```

## 🤔 Questions

> `command not found: docker-compose`

```diff
- % docker-compose --version
+ % docker compose version
Docker Compose version v2.31.0-desktop.2
```
