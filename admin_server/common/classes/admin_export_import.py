"""
django-export-import

- https://django-import-export.readthedocs.io/en/latest/index.html
- https://note.com/shinya_hd/n/n1f742973a81c#42cb7b34-966a-42b8-96bd-5553350a9e16
"""

from import_export.resources import ModelResource as ImportExportModelResource
from import_export.formats import base_formats as ImportExportBaseFormats
from import_export.admin import (
    ImportExportMixin as ImportExportButtonMixin,
    ExportMixin as ExportButtonMixin,
    ImportMixin as ImportButtonMixin,
    ExportActionMixin as ExportTableActionMixin,
)


__all__ = [
    "AdminExportImportModelResource",
    "AdminModelWithExportButton",
    "AdminModelWithImportButton",
    "AdminModelWithExportImportButton",
    "AdminModelWithExportTableSelectedAction",
]


class AdminExportImportModelResource(ImportExportModelResource):
    """
    django-export-import 插件的资源类
    """

    class Meta:
        skip_unchanged = False


# ----------------------------------------------------------------------------------------------------


"""
django-export-import 插件的配置类
"""
EXPORT_IMPORT_FORMATS = [
    ImportExportBaseFormats.JSON,
    ImportExportBaseFormats.YAML,
    ImportExportBaseFormats.CSV,
    ImportExportBaseFormats.XLSX,
    ImportExportBaseFormats.HTML,
]


class AdminModelWithExportButton(ExportButtonMixin):
    """
    使用 django-export-import 插件
    在页面顶部添加了导出按钮
    """

    formats = EXPORT_IMPORT_FORMATS


class AdminModelWithImportButton(ImportButtonMixin):
    """
    使用 django-export-import 插件
    在页面顶部添加了导入按钮
    """

    formats = EXPORT_IMPORT_FORMATS


class AdminModelWithExportImportButton(ImportExportButtonMixin):
    """
    使用 django-export-import 插件
    在页面顶部添加了导出和导入按钮
    """

    formats = EXPORT_IMPORT_FORMATS


# ----------------------------------------------------------------------------------------------------


class AdminModelWithExportTableSelectedAction(ExportTableActionMixin):
    """
    使用 django-export-import 插件
    在列表头部 Action 中添加了导出选项
    """

    pass
