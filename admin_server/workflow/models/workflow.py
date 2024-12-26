from django.db import models


class WorkflowModel(models.Model):
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
    is_active = models.BooleanField(
        default=False,
        verbose_name="启动中 / 停止中",
    )
    is_draft = models.BooleanField(
        default=False,
        verbose_name="编辑中",
    )

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "workflow"
        verbose_name_plural = "Workflow"
        ordering = ["id"]
