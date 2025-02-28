import os

from .base import *


# General
# ----------------------------------------------------------------------------------------------------

DEBUG = False

ALLOWED_HOSTS = []


# Database
# ----------------------------------------------------------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("CUSTOM_DB_NAME", "admin_server_db"),
        "USER": os.environ.get("CUSTOM_DB_USER", "postgres"),
        "PASSWORD": os.environ.get("CUSTOM_DB_PASSWORD", "postgres"),
        "HOST": os.environ.get("CUSTOM_DB_HOST", "0.0.0.0"),
        "PORT": os.environ.get("CUSTOM_DB_PORT", "8070"),
    }
}


# CACHES
# ----------------------------------------------------------------------------------------------------

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{os.environ.get('CUSTOM_REDIS_HOST', '127.0.0.1')}:{os.environ.get('CUSTOM_REDIS_PORT', '8090')}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": True,
        },
    }
}
