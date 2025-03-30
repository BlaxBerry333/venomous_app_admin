from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import workflow_data, workflow_history, workflow_data_download


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
    viewset=workflow_data.WorkflowDataViewSet,
    basename="workflow",
    prefix="data",
)


"""
GET     /workflow/download/
GET     /workflow/download/?type=<file_type>
GET     /workflow/download/<id>/
"""
workflow_router.register(
    viewset=workflow_data_download.WorkflowDataDownloadViewSet,
    basename="workflow_data_download",
    prefix="download",
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
    viewset=workflow_history.WorkflowHistoryViewSet,
    basename="workflow_history",
    prefix="history",
)


urlpatterns = [
    path("", include(workflow_router.urls)),
]
