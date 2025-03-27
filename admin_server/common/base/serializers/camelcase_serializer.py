from rest_framework import serializers


class CamelCaseSerializer(serializers.ModelSerializer):
    """
    将数据库中的蛇形命名 ( snake_case ) 转换为驼峰命名 ( camelCase ) 的基础序列化器
    替代 serializers.ModelSerializer
    """

    def to_representation(self, instance):
        """
        序列化 ( snake_case → camelCase )
        """
        result = super().to_representation(instance)
        return {self._to_camel_case(key): value for key, value in result.items()}

    def to_internal_value(self, data):
        """
        反序列化 ( camelCase → snake_case )
        """
        snake_case_data = {
            self._to_snake_case(key): value for key, value in data.items()
        }
        return super().to_internal_value(snake_case_data)

    @staticmethod
    def _to_camel_case(snake_str):
        """
        snake_case → camelCase
        """
        components = snake_str.split("_")
        return components[0] + "".join(x.title() for x in components[1:])

    @staticmethod
    def _to_snake_case(camel_str):
        """
        camelCase → snake_case
        """
        import re

        name = re.sub("([A-Z])", r"_\1", camel_str)
        return name.lower().lstrip("_")
