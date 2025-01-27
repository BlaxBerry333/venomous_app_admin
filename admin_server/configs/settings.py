from datetime import timedelta
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent


# General
# ----------------------------------------------------------------------------------------------------

DEBUG = True

ALLOWED_HOSTS = []


# urls
# ----------------------------------------------------------------------------------------------------

ROOT_URLCONF = "configs.urls"

WSGI_APPLICATION = "configs.wsgi.application"


# Applications
# ----------------------------------------------------------------------------------------------------
# Django Apps
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
# Third Party Apps
INSTALLED_APPS += [
    "rest_framework",
]
# Custom Local Apps
INSTALLED_APPS += [
    "users",
    "workflow",
]


# DRF
REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 100,
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S%z",
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}

# JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
}


# Default primary key field type
# ----------------------------------------------------------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Database
# ----------------------------------------------------------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("CUSTOM_DB_NAME", "admin_server_db"),
        "USER": os.environ.get("CUSTOM_DB_USER", "postgres"),
        "PASSWORD": os.environ.get("CUSTOM_DB_PASSWORD", "postgres"),
        "HOST": os.environ.get("CUSTOM_DB_HOST", "0.0.0.0"),
        "PORT": os.environ.get("CUSTOM_DB_PORT", "5432"),
    }
}

# CACHES
# ----------------------------------------------------------------------------------------------------

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{os.environ.get('CUSTOM_REDIS_HOST', '127.0.0.1')}:{os.environ.get('CUSTOM_REDIS_PORT', '6379')}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": True,
        },
    }
}


# Middlewares
# ----------------------------------------------------------------------------------------------------

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# Security
# ----------------------------------------------------------------------------------------------------

SECRET_KEY = "django-insecure-mlkz+o)$es(cv8@(x+e+*levw1s^b*!#zia9h1+q7ei6kub5g+"


# Password validation
# ----------------------------------------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Static files (CSS, JavaScript, Images)
# ----------------------------------------------------------------------------------------------------

STATIC_URL = "static/"

STATICFILES_DIRS = [BASE_DIR / "static"]


# Templates
# ----------------------------------------------------------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# Internationalization
# ----------------------------------------------------------------------------------------------------

LANGUAGE_CODE = "en"

TIME_ZONE = "Asia/Tokyo"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True
