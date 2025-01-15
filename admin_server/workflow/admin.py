from django.contrib import admin


from workflow.models.workflow import WorkflowModel


@admin.register(WorkflowModel)
class WorkflowAdmin(admin.ModelAdmin):
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
