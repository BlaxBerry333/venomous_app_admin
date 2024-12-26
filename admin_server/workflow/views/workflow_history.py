from rest_framework import viewsets

from workflow.models.workflow_history import WorkflowHistoryModel
from workflow.serializers.workflow_history import WorkflowHistorySerializer


class WorkflowHistoryViewSet(viewsets.ModelViewSet):
    queryset = WorkflowHistoryModel.objects.all()
    serializer_class = WorkflowHistorySerializer
    lookup_field = "id"
