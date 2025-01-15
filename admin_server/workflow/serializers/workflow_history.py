from rest_framework import serializers

from workflow.models.workflow_history import WorkflowHistoryModel


class WorkflowHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkflowHistoryModel
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
