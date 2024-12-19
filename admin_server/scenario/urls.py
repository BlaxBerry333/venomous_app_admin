from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import scenario_flow


scenario_router = DefaultRouter()

"""
GET     /scenario/flow/        
POST    /scenario/flow/        
GET     /scenario/flow/<id>/   
PATCH   /scenario/flow/<id>/   
PUT     /scenario/flow/<id>/   
DELETE  /scenario/flow/<id>/   
"""
scenario_router.register(
    prefix="flow", viewset=scenario_flow.ScenarioFlowViewSet, basename="scenario_flow"
)

urlpatterns = [
    path("", include(scenario_router.urls)),
]
