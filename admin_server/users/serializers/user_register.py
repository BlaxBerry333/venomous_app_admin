from django.contrib.auth.models import User
from rest_framework import serializers


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # 密码只写，不返回给客户端
    is_staff = serializers.BooleanField(default=False)  # 是否为管理员
    is_superuser = serializers.BooleanField(default=False)  # 是否为超级用户

    class Meta:
        model = User
        fields = ["username", "email", "password", "is_staff", "is_superuser"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            is_staff=validated_data.get("is_staff", False),
            is_superuser=validated_data.get("is_superuser", False),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
