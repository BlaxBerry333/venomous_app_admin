from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import workflow, workflow_history, workflow_download


workflow_router = DefaultRouter()

"""
GET     /workflow/data/        
POST    /workflow/data/        
GET     /workflow/data/<id>/   
PATCH   /workflow/data/<id>/   
PUT     /workflow/data/<id>/   
DELETE  /workflow/data/<id>/   
"""
workflow_router.register(
    prefix="data",
    viewset=workflow.WorkflowViewSet,
    basename="workflow",
)


"""
GET     /workflow/download/
GET     /workflow/download/?type=<file_type>
GET     /workflow/download/<id>/
"""
workflow_router.register(
    prefix="download",
    viewset=workflow_download.WorkflowDownloadViewSet,
    basename="workflow_download",
)

"""
GET     /workflow/history/
POST    /workflow/history/
GET     /workflow/history/<id>/
PATCH   /workflow/history/<id>/
PUT     /workflow/history/<id>/
DELETE  /workflow/history/<id>/
"""
workflow_router.register(
    prefix="history",
    viewset=workflow_history.WorkflowHistoryViewSet,
    basename="workflow_history",
)


urlpatterns = [
    path("", include(workflow_router.urls)),
]
