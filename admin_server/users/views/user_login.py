from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 使用 Django 自带的验证逻辑
        user = authenticate(
            request,
            username=username,
            password=password,
        )
        if user is None:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # 使用 Django 自带的登陆逻辑
        login(request, user)

        # 生成 RefreshToken ( 作为访客的身份标识 )
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
            },
            status=status.HTTP_200_OK,
        )


class VisitorLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # 创建一个没有关联用户的临时生成 RefreshToken ( 作为访客的身份标识 )
        refresh = RefreshToken()
        return Response(
            {
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
            },
            status=status.HTTP_200_OK,
        )
