from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from users.serializers.user_profile import UserProfileSerializer


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        user_data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "last_login": user.last_login,  # 用户最后登录的日期
            "date_joined": user.date_joined,  # 用户注册的日期
            "is_active": user.is_active,  # 用户是否处于激活状态。一个被禁用的用户将无法登录
            "is_staff": user.is_staff,  # 用户是否是站点管理员，可以控制该用户是否能访问 Django 管理后台
            "is_superuser": user.is_superuser,  # 用户是否是超级用户，拥有所有权限
        }

        return Response(
            user_data,
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            # 保存用户数据
            serializer.save()

            # 返回更新后的用户数据
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
