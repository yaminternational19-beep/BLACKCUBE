from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioItemViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'', PortfolioItemViewSet, basename='portfolio')

urlpatterns = [
    path('', include(router.urls)),
]
