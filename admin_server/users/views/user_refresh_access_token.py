from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions


class UserRefreshAccessTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # 解码 refresh_token 获取用户信息
            token = RefreshToken(refresh_token)

            # 使用 refresh_token 创建新的 access_token
            new_access_token = str(token.access_token)

            # 返回新的 refresh_token
            new_refresh_token = str(token)

            return Response(
                {
                    "access_token": new_access_token,
                    "refresh_token": new_refresh_token,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as err:
            return Response(
                {"error": str(err)},
                status=status.HTTP_401_UNAUTHORIZED,
            )
