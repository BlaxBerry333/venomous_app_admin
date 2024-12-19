from django.contrib import admin

from scenario.models.scenario_flow import ScenarioFlowModel


@admin.register(ScenarioFlowModel)
class ScenarioFLowAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "is_active",
        "is_draft",
        "description",
    )
    list_filter = ("created_at",)
    list_per_page = 10
    search_fields = list_display
    readonly_fields = ("id", "created_at", "updated_at")
