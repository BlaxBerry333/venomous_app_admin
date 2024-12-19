from rest_framework import viewsets

from scenario.models.scenario_flow import ScenarioFlowModel
from scenario.serializers.scenario_flow import ScenarioFlowSerializer


class ScenarioFlowViewSet(viewsets.ModelViewSet):
    queryset = ScenarioFlowModel.objects.all()
    serializer_class = ScenarioFlowSerializer
    lookup_field = "id"
