import json

from django.db import models


class WorkflowDataModel(models.Model):
    """
    Model of Workflow Data
    """

    MAX_AMOUNT_OF_INSTANCE = 100
    MAX_AMOUNT_OF_ELEMENT_NODES = 500
    DEFAULT_VALUE_OF_ELEMENT = {
        "nodes": [],
        "edges": [],
    }
    DEFAULT_OPTIONS_OF_TYPE = [
        ("LOGIC", "LOGIC ( 逻辑图 )"),
        ("DRAFT", "DRAFT ( 草稿图 )"),
    ]

    id = models.BigAutoField(
        primary_key=True,
        verbose_name="流程图ID",
    )
    name = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="流程图名称",
        help_text="( 100 字符以内 )",
    )
    description = models.CharField(
        max_length=250,
        blank=True,
        default="",
        verbose_name="流程图简介",
        help_text="( 250 字符以内 )",
    )
    type = models.CharField(
        max_length=10,
        choices=DEFAULT_OPTIONS_OF_TYPE,
        default=DEFAULT_OPTIONS_OF_TYPE[0][0],
        verbose_name="流程图类型",
    )
    element = models.TextField(
        blank=True,
        default=json.dumps(DEFAULT_VALUE_OF_ELEMENT),
        verbose_name="流程图元素",
        help_text="( JSON 字符串, 必须包含 nodes、edges )",
    )
    is_active = models.BooleanField(
        default=False,
        verbose_name="启动中",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name="创建日期",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name="更新日期",
    )

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "workflow_data"
        verbose_name_plural = "Workflow Data"
        ordering = ["id"]
