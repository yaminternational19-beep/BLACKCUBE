from django.urls import path
from .views import FooterAdminAPIView

urlpatterns = [
    path('', FooterAdminAPIView.as_view(), name='admin_footer_api'),
]
