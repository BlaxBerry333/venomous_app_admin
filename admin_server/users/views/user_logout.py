from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


class UserLogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            # 使用 Django 自带的退出逻辑
            # Django 自带的 logout 方法会清除 session
            logout(request)

            return Response(
                {"detail": "Successfully logged out."},
                status=status.HTTP_200_OK,
            )

        except Exception as err:
            return Response(
                {"error": str(err)},
                status=status.HTTP_400_BAD_REQUEST,
            )
