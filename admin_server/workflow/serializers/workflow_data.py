import json

from rest_framework import serializers

from common.base.serializers import CamelCaseSerializer
from workflow.models.workflow_data import WorkflowDataModel
from workflow.base import validation


__all__ = ["WorkflowDataSerializer"]


class WorkflowDataSerializer(CamelCaseSerializer):
    """
    Workflow Data 的序列化器
    """

    class Meta:
        model = WorkflowDataModel
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def create(self, validated_data):
        total_instances = WorkflowDataModel.objects.count()
        max_count = WorkflowDataModel.MAX_AMOUNT_OF_INSTANCE
        if total_instances >= max_count:
            raise serializers.ValidationError(
                f"Number of workflow instances cannot exceed {max_count}"
            )
        return super().create(validated_data)

    def validate_element(self, value):
        """
        验证 element 字段的值
        """
        try:
            element = json.loads(value)
        except json.JSONDecodeError:
            raise serializers.ValidationError("element must be a valid JSON string")

        validation.validate_structure_of_element(
            element, WorkflowDataModel.MAX_AMOUNT_OF_ELEMENT_NODES
        )
        nodes = element["nodes"]
        edges = element["edges"]

        for node in nodes:
            validation.validate_structure_of_node(node)
            node_type = node["type"]
            node_data = node["data"]
            supported_node_type = validation.SupportedNodeType
            if node_type == supported_node_type.Message:
                validation.validate_message_node(node_data)
            elif node_type == supported_node_type.Fetch:
                validation.validate_fetch_node(node_data)
            elif node_type == supported_node_type.Script:
                validation.validate_script_node(node_data)

        return value
