from rest_framework import serializers

from common.base.serializers import CamelCaseSerializer
from workflow.models.workflow_history import WorkflowHistoryModel


class WorkflowHistorySerializer(CamelCaseSerializer):
    """
    Workflow Histroy 的序列化器
    """

    class Meta:
        model = WorkflowHistoryModel
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
