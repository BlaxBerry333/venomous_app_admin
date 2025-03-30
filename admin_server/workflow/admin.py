from django.contrib import admin


from common.base.admin.admin_export_import import (
    AdminExportImportModelResource,
    AdminModelWithExportImportButton,
    AdminModelWithExportButton,
    AdminModelWithExportTableSelectedAction,
)
from workflow.models.workflow_data import WorkflowDataModel
from workflow.models.workflow_history import WorkflowHistoryModel


# ----------------------------------------------------------------------------------------------------


class WorkflowDataExportImportResource(AdminExportImportModelResource):
    class Meta:
        model = WorkflowDataModel
        fields = ("id", "name", "type", "is_active", "description")


@admin.register(WorkflowDataModel)
class WorkflowDataAdmin(
    AdminModelWithExportImportButton,
    AdminModelWithExportTableSelectedAction,
    admin.ModelAdmin,
):
    resource_class = WorkflowDataExportImportResource

    list_display = ("id", "name", "type", "is_active", "description")
    list_filter = ("created_at",)
    list_per_page = 10
    search_fields = list_display
    readonly_fields = ("created_at", "updated_at", "id", "type")


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
    readonly_fields = ("created_at", "updated_at", "id")
