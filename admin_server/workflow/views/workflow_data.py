from rest_framework import viewsets


from workflow.models.workflow_data import WorkflowDataModel
from workflow.serializers.workflow_data import WorkflowDataSerializer


class WorkflowDataViewSet(viewsets.ModelViewSet):
    """
    Workflow Data 的接口
    """

    queryset = WorkflowDataModel.objects.all()
    serializer_class = WorkflowDataSerializer
    lookup_field = "id"
