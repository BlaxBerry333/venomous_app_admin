from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from users.serializers.user_register import UserRegisterSerializer


class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            # 保存用户数据
            user = serializer.save()

            # 创建 RefreshToken 实例
            refresh = RefreshToken.for_user(user)

            # 返回包含 access_token 和 refresh_token 的响应
            return Response(
                {
                    "access_token": str(refresh.access_token),  # access token
                    "refresh_token": str(refresh),  # refresh token
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
