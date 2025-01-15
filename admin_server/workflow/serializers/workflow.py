from rest_framework import serializers

from workflow.models.workflow import WorkflowModel


class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkflowModel
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
