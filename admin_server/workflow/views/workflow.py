from rest_framework import viewsets


from workflow.models.workflow import WorkflowModel
from workflow.serializers.workflow import WorkflowSerializer


class WorkflowViewSet(viewsets.ModelViewSet):
    queryset = WorkflowModel.objects.all()
    serializer_class = WorkflowSerializer
    lookup_field = "id"
