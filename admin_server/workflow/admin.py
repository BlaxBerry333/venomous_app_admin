from django.contrib import admin


from common.classes.admin_export_import import (
    AdminExportImportModelResource,
    AdminModelWithExportImportButton,
    AdminModelWithExportButton,
    AdminModelWithExportTableSelectedAction,
)
from workflow.models.workflow import WorkflowModel
from workflow.models.workflow_history import WorkflowHistoryModel


# ----------------------------------------------------------------------------------------------------


class WorkflowExportImportResource(AdminExportImportModelResource):
    class Meta:
        model = WorkflowModel
        fields = ("id", "name", "is_active", "is_draft", "description")


@admin.register(WorkflowModel)
class WorkflowAdmin(
    AdminModelWithExportImportButton,
    AdminModelWithExportTableSelectedAction,
    admin.ModelAdmin,
):
    resource_class = WorkflowExportImportResource

    list_display = ("id", "name", "is_active", "is_draft", "description")
    list_filter = ("created_at",)
    list_per_page = 10
    search_fields = list_display
    readonly_fields = ("id", "created_at", "updated_at")


# ----------------------------------------------------------------------------------------------------


class WorkflowHistoryExportImportResource(AdminExportImportModelResource):
    class Meta:
        model = WorkflowHistoryModel
        fields = ("id", "name", "created_at", "updated_at", "description")


@admin.register(WorkflowHistoryModel)
class WorkflowHistoryAdmin(
    AdminModelWithExportButton,
    AdminModelWithExportTableSelectedAction,
    admin.ModelAdmin,
):
    resource_class = WorkflowHistoryExportImportResource

    list_display = ("id", "name", "created_at", "updated_at", "description")
    list_filter = ("created_at",)
    list_per_page = 10
    search_fields = list_display
    readonly_fields = ("id", "created_at", "updated_at")
