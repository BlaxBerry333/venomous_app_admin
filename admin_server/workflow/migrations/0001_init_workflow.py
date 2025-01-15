# Generated by Django 4.2.16 on 2024-12-26 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="WorkflowHistoryModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        primary_key=True,
                        serialize=False,
                        verbose_name="流程图更新记录ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        blank=True,
                        default="",
                        help_text="( 100 字符以内 )",
                        max_length=100,
                        verbose_name="流程图更新记录名称",
                    ),
                ),
                (
                    "description",
                    models.CharField(
                        blank=True,
                        default="",
                        help_text="( 250 字符以内 )",
                        max_length=250,
                        verbose_name="流程图更新记录简介",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="创建日期"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="更新日期"),
                ),
            ],
            options={
                "verbose_name_plural": "Workflow History",
                "db_table": "workflow_history",
                "ordering": ["id"],
            },
        ),
        migrations.CreateModel(
            name="WorkflowModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        primary_key=True, serialize=False, verbose_name="流程图ID"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        blank=True,
                        default="",
                        help_text="( 100 字符以内 )",
                        max_length=100,
                        verbose_name="流程图名称",
                    ),
                ),
                (
                    "description",
                    models.CharField(
                        blank=True,
                        default="",
                        help_text="( 250 字符以内 )",
                        max_length=250,
                        verbose_name="流程图简介",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, verbose_name="创建日期"),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="更新日期"),
                ),
                (
                    "is_active",
                    models.BooleanField(default=False, verbose_name="启动中 / 停止中"),
                ),
                ("is_draft", models.BooleanField(default=False, verbose_name="编辑中")),
            ],
            options={
                "verbose_name_plural": "Workflow",
                "db_table": "workflow",
                "ordering": ["id"],
            },
        ),
    ]
