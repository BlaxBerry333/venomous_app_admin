from django.urls import path

from .views import (
    UserRegisterView,
    UserLoginView,
    UserLogoutView,
    UserRefreshAccessTokenView,
    UserProfileView,
    VisitorLoginView,
)

urlpatterns = [
    # """
    # POST /users/register/
    # """
    path("register/", UserRegisterView.as_view(), name="user_register"),
    # """
    # POST /users/login/
    # """
    path("login/", UserLoginView.as_view(), name="user_login"),
    # """
    # POST /users/logout/
    # """
    path("logout/", UserLogoutView.as_view(), name="user_logout"),
    # """
    # POST /users/refresh-access-token/
    # """
    path(
        "refresh-access-token/",
        UserRefreshAccessTokenView.as_view(),
        name="user_refresh_access_token",
    ),
    # """
    # GET /users/profile/
    # """
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    # """
    # POST /users/visitor/login/
    # """
    path("visitor/login/", VisitorLoginView.as_view(), name="user_visitor_login"),
]
