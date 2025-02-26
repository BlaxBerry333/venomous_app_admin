import os

env = os.getenv("CUSTOM_DJANGO_ENV", "development")

if env == "development":
    from .development import *
elif env == "production":
    from .production import *
else:
    from .development import *
