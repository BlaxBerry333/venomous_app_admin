# Venomous Apps' Admin Server

## 📚 Tech Stacks

- [Python]() v3.10.0
- [Django]() v4.2.16
- [django-rest-framework]() v3.15.2
- [psycopg2-binary]() v2.9.9
- [numpy]() v1.23.5
- [pandas]() v1.5.3
- [openpyxl]() v3.0.10

## 🚀 Local Setup

[more →](../README.md)

- Server URL: `http://localhost:8080/`
- Django Admin: `http://localhost:8080/admin/`

## 🛠 Commands

```shell
# make sure you're in the root directory of the project
# then access the 'admin_server' container's shell
% cd .. && make entry CONTAINER=admin_server


# install new package
# 1. update admin_server/requirements.txt
# 2. run "make build" in the root directory of the project
# 3. run "make setup" in the root directory of the project
# 4. run "make start-all" in the root directory of the project


# create admin superuser
# - USERNAME: admin
# - EMAIL: admin@example.com
# - PASSWORD: admin
root@[CONTAINER_ID]:/app# \
    export DJANGO_SUPERUSER_USERNAME=[username] && \
    export DJANGO_SUPERUSER_EMAIL=[email@example.com] && \
    export DJANGO_SUPERUSER_PASSWORD=[password] && \
    python manage.py createsuperuser --noinput


# run server
root@[CONTAINER_ID]:/app# \
    python manage.py createsuperuser


# migration
root@[CONTAINER_ID]:/app# \
    python manage.py makemigrations
root@[CONTAINER_ID]:/app# \
    python manage.py makemigrations [app_name] --name [migration_name]


# migrate
root@[CONTAINER_ID]:/app# \
    python manage.py migrate
root@[CONTAINER_ID]:/app# \
    python manage.py migrate [migration_name]


# code format
root@[CONTAINER_ID]:/app# \
    black . --check
root@[CONTAINER_ID]:/app# \
    black .
```

## 🔗 API

| Method | URL                                    | Description                                           |
| ------ | -------------------------------------- | ----------------------------------------------------- |
|        | User                                   |                                                       |
| POST   | `/users/register/`                     | user register                                         |
| POST   | `/users/login/`                        | user login                                            |
| POST   | `/users/logout/`                       | user logout                                           |
| POST   | `/users/refresh-access-token/`         | refresh user access token                             |
|        | Workflow Data                          |                                                       |
| GET    | `/workflow/data/`                      | get all workflows' data                               |
| POST   | `/workflow/data/`                      | create a workflow                                     |
| GET    | `/workflow/data/<id>/`                 | get a specific workflow's data                        |
| PATCH  | `/workflow/data/<id>/`                 | update a specific workflow's data                     |
| PUT    | `/workflow/data/<id>/`                 | update a specific workflow's data                     |
| DELETE | `/workflow/data/<id>/`                 | delete a specific workflow's data                     |
|        | Workflow Download                      |                                                       |
| GET    | `/workflow/download/`                  | download a `.scv` file of workflows' data             |
| GET    | `/workflow/download/?type=<file_type>` | download a specific type file of workflows' data      |
| GET    | `/workflow/download/<id>`              | download a `.json` file of a specific workflows' data |
|        | Workflow History                       |                                                       |
| GET    | `/workflow/history/`                   | get all workflows' update history                     |
| POST   | `/workflow/history/`                   | create a workflow update history                      |
| GET    | `/workflow/history/<id>/`              | get a specific workflow's update history              |
| PATCH  | `/workflow/history/<id>/`              | update a specific workflow's update history           |
| PUT    | `/workflow/history/<id>/`              | update a specific workflow's update history           |
| DELETE | `/workflow/history/<id>/`              | delete a specific workflow's update history           |

## 📂 Project Structure

```shell
venomous_apps/
└── admin_server/
    ├── .venv/
    │
    ├── common/
    │    ├── utils/
    │    └── ...
    │
    ├── configs/                # main application
    │    ├── settings.py
    │    ├── urls.py
    │    ├── asgi.py
    │    ├── wsgi.py
    │    └── ...
    │
    ├── users/                  # user apis' application
    │    ├── migrations/
    │    ├── serializers/
    │    ├── views/
    │    ├── urls.py
    │    └── ...
    │
    ├── workflow/               # workflow apis' application
    │    ├── migrations/
    │    ├── models/
    │    ├── serializers/
    │    ├── views/
    │    ├── admin.py
    │    ├── urls.py
    │    └── ...
    │
    ├── manage.py
    │
    ├── .Dockerfile.dev
    │
    ├── requirements.txt
    ├── pyproject.toml
    ├── Makefile
    │
    └── ...
```
