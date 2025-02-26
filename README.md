# Venomous Apps' Admin

|                                 | Main Skills                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |   Topic   |  Port  |
| :-----------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------: | :----: |
| [Admin Client](./admin_client/) | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-frontend--vite.png?raw=true" style="width:48px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-frontend--react.png?raw=true" style="width:48px;" />                                                                                                                                                                                      |    SPA    | `3000` |
|         Admin Client UI         | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-frontend--vite.png?raw=true" style="width:48px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-frontend--storybook.png?raw=true" style="width:48px;" />                                                                                                                                                                                  | Storybook | `3100` |
| [Admin Server](./admin_server/) | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:48px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-backend--django.png?raw=true" style="width:48px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-backend--django-rest-framework.png?raw=true" style="width:48px;" /> | REST API  | `8080` |
|         Admin Server DB         | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:48px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/database--postgresql.png?raw=true" style="width:48px;" />                                                                                                                                                                             |    DB     | `5432` |
|      Admin Server Redis DB      | <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/web-infrastructure--docker.png?raw=true" style="width:48px;" /> <img src="https://github.com/BlaxBerry333/programming-notes/blob/main/docs/public/static/skill-icons/database--redis.png?raw=true" style="width:48px;" />                                                                                                                                                                                  |    DB     | `6379` |

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
