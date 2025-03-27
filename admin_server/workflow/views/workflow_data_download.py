import json

from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import status

from common.utils.generate_files import generate_csv_file, download_excel_file
from workflow.models.workflow_data import WorkflowDataModel
from workflow.serializers.workflow_data import WorkflowDataSerializer


# 文件类型
class FileType:
    CSV = "csv"
    EXCEL = "excel"
    XLSX = "xlsx"
    JSON = "json"


# 文件类型配置
FILE_TYPES_CONFIGS = {
    FileType.CSV: {
        "suffix": ".csv",
        "content_type": "text/csv",
    },
    FileType.XLSX: {
        "suffix": ".xlsx",
        "content_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    FileType.JSON: {
        "suffix": ".json",
        "content_type": "application/json",
    },
}


class WorkflowDataDownloadViewSet(viewsets.ModelViewSet):
    """
    Workflow Data Download 的接口 ( 请求时自动下载，返回 File Stream )

    1. GET /workflow/download/  ( 下载所有的 Workflow Data )
        - CSV: 默认 or ?type=csv
        - Excel: ?type=excel or ?type=xlsx
        - JSON: ?type=json

    2. GET /workflow/download/<id>/  ( 下载指定的一个 Workflow Data )
        - JSON: 默认
    """

    queryset = WorkflowDataModel.objects.all()
    serializer_class = WorkflowDataSerializer
    http_method_names = ["get"]

    def list(self, request, *args, **kwargs):
        file_type = request.GET.get("type")
        file_name = "workflows_data_all"

        # CSV 文件处理
        # /workflow/download/
        # /workflow/download/?type=csv
        if file_type == FileType.CSV or not file_type:
            buffer = generate_csv_file(
                headers=[
                    field.verbose_name for field in WorkflowDataModel._meta.get_fields()
                ],
                data=[
                    [
                        getattr(workflow, field.name)
                        for field in WorkflowDataModel._meta.get_fields()
                    ]
                    for workflow in self.queryset
                ],
            )
            file_suffix = FILE_TYPES_CONFIGS[FileType.CSV]["suffix"]
            file_data = buffer.getvalue()
            return HttpResponse(
                file_data,
                content_type=FILE_TYPES_CONFIGS[FileType.CSV]["content_type"],
                headers={
                    "Content-Disposition": f"attachment; filename={file_name + file_suffix}"
                },
            )

        # Excel 文件处理
        # /workflow/download/?type=excel
        # OR /workflow/download/?type=xlsx
        elif file_type in (FileType.EXCEL, FileType.XLSX):
            file_suffix = FILE_TYPES_CONFIGS[FileType.EXCEL]["suffix"]
            file_data = download_excel_file(
                headers=[
                    field.verbose_name for field in WorkflowDataModel._meta.get_fields()
                ],
                data=[
                    [
                        getattr(workflow, field.name)
                        for field in WorkflowDataModel._meta.get_fields()
                    ]
                    for workflow in self.queryset
                ],
                sheet_name=file_name,
            )
            return HttpResponse(
                file_data.getvalue(),
                content_type=FILE_TYPES_CONFIGS[FileType.EXCEL]["content_type"],
                headers={
                    "Content-Disposition": f"attachment; filename={file_name + file_suffix}",
                },
            )

        # JSON 文件处理
        # /workflow/download/?type=json
        elif file_type == FileType.JSON:
            file_suffix = FILE_TYPES_CONFIGS[FileType.JSON]["suffix"]
            file_data = json.dumps(
                [WorkflowDataSerializer(workflow).data for workflow in self.queryset]
            )
            return HttpResponse(
                file_data,
                content_type=FILE_TYPES_CONFIGS[FileType.JSON]["content_type"],
                headers={
                    "Content-Disposition": f"attachment; filename={file_name + file_suffix}",
                },
            )

        # 未知的文件类型返回错误信息
        else:
            return HttpResponse(
                json.dumps({"error": f"Invalid file type {file_type}"}),
                content_type="application/json",
                status=status.HTTP_400_BAD_REQUEST,
            )

    def retrieve(self, request, *args, **kwargs):
        pk = kwargs.get("pk")

        try:
            workflow = WorkflowDataModel.objects.get(id=pk)
        except WorkflowDataModel.MultipleObjectsReturned:
            return HttpResponse(
                json.dumps({"error": f"Found multiple workflow data of id #{pk}"}),
                content_type="application/json",
                status=status.HTTP_400_BAD_REQUEST,
            )
        except WorkflowDataModel.DoesNotExist:
            return HttpResponse(
                json.dumps({"error": f"Not found workflow data of id #{pk}"}),
                content_type="application/json",
                status=status.HTTP_404_NOT_FOUND,
            )

        # 返回 JSON 文件
        serializer = WorkflowDataSerializer(workflow)
        file_name = f"workflow_data_{serializer.data['id']}"
        file_suffix = FILE_TYPES_CONFIGS[FileType.JSON]["suffix"]
        file_data = json.dumps(serializer.data, indent=4)
        return HttpResponse(
            file_data,
            content_type=FILE_TYPES_CONFIGS[FileType.JSON]["content_type"],
            headers={
                "Content-Disposition": f"attachment; filename={file_name + file_suffix}",
            },
        )
