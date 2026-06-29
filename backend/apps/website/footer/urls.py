from django.urls import path
from .views import FooterPublicAPIView

urlpatterns = [
    path('', FooterPublicAPIView.as_view(), name='website_footer_api'),
]
