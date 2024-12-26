from django.db import models


class WorkflowHistoryModel(models.Model):
    id = models.BigAutoField(
        primary_key=True,
        verbose_name="流程图更新记录ID",
    )
    name = models.CharField(
        max_length=100,
        blank=True,
        default="",
        verbose_name="流程图更新记录名称",
        help_text="( 100 字符以内 )",
    )
    description = models.CharField(
        max_length=250,
        blank=True,
        default="",
        verbose_name="流程图更新记录简介",
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

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self._original_name = self.name
    #     self._original_description = self.description

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     self._original_name = self.name
    #     self._original_description = self.description
    #     return self

    # def revert(self):
    #     self.name = self._original_name
    #     self.description = self._original_description
    #     self.save()
    #     return self

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "workflow_history"
        verbose_name_plural = "Workflow History"
        ordering = ["id"]
