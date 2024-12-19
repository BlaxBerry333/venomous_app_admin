from rest_framework import serializers

from scenario.models.scenario_flow import ScenarioFlowModel


class ScenarioFlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScenarioFlowModel
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
