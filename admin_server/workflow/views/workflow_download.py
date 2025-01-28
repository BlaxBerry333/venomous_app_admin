import json
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import status

from common.utils.generate_files import generate_csv_file, download_excel_file
from workflow.models.workflow import WorkflowModel
from workflow.serializers.workflow import WorkflowSerializer


class WorkflowDownloadViewSet(viewsets.ModelViewSet):
    queryset = WorkflowModel.objects.all()
    serializer_class = WorkflowSerializer
    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        all_workflows = WorkflowModel.objects.all()

        file_type = request.GET.get("type")
        file_name = "workflows_all"

        # 返回 CSV 文件
        # /workflow/download/ OR /workflow/download/?type=csv
        if file_type == "csv" or not file_type:
            buffer = generate_csv_file(
                headers=[
                    field.verbose_name for field in WorkflowModel._meta.get_fields()
                ],
                data=[
                    [
                        getattr(workflow, field.name)
                        for field in WorkflowModel._meta.get_fields()
                    ]
                    for workflow in all_workflows
                ],
            )
            file_suffix = ".csv"
            file_data = buffer.getvalue()
            return HttpResponse(
                file_data,
                content_type="text/csv",
                headers={
                    "Content-Disposition": f"attachment; filename={file_name + file_suffix}"
                },
            )

        # 返回 Excel 文件
        # /workflow/download/?type=excel OR /workflow/download/?type=xlsx
        elif file_type == "excel" or file_type == "xlsx":
            file_suffix = ".xlsx"
            file_data = download_excel_file(
                headers=[
                    field.verbose_name for field in WorkflowModel._meta.get_fields()
                ],
                data=[
                    [
                        getattr(workflow, field.name)
                        for field in WorkflowModel._meta.get_fields()
                    ]
                    for workflow in all_workflows
                ],
                sheet_name=file_name,
            )
            return HttpResponse(
                file_data.getvalue(),
                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                headers={
                    "Content-Disposition": f"attachment; filename={file_name + file_suffix}",
                },
            )

        # 返回 JSON 文件
        # /workflow/download/?type=json
        elif file_type == "json":
            file_suffix = ".json"
            file_data = json.dumps(
                [WorkflowSerializer(workflow).data for workflow in all_workflows]
            )
            return HttpResponse(
                file_data,
                content_type="application/json",
                headers={
                    "Content-Disposition": f"attachment; filename={file_name + file_suffix}",
                },
            )

        # 未知的文件类型
        else:
            return HttpResponse(
                {"error": "Invalid file type"},
                content_type="application/json",
                status=status.HTTP_400_BAD_REQUEST,
            )

    def retrieve(self, request, *args, **kwargs):
        workflow_id = kwargs.get("pk")

        try:
            workflow = WorkflowModel.objects.get(id=workflow_id)
        except WorkflowModel.MultipleObjectsReturned:
            return HttpResponse(
                {"error": "Multiple workflows found"},
                content_type="application/json",
                status=status.HTTP_400_BAD_REQUEST,
            )
        except WorkflowModel.DoesNotExist:
            return HttpResponse(
                {"error": "Workflow not found"},
                content_type="application/json",
                status=status.HTTP_404_NOT_FOUND,
            )

        # 返回 JSON 文件
        serializer = WorkflowSerializer(workflow)
        file_name = f"workflow_{serializer.data['id']}"
        file_suffix = ".json"
        file_data = json.dumps(serializer.data, indent=4)
        return HttpResponse(
            file_data,
            content_type="application/json",
            headers={
                "Content-Disposition": f"attachment; filename={file_name + file_suffix}",
            },
        )
