from django.urls import path
from .views import (
    ContactSubmissionCreateView,
    CookieConsentCreateAPIView,
    ProjectEstimateCreateAPIView,
    ClientLogoPublicAPIView
)

urlpatterns = [
    path('', ContactSubmissionCreateView.as_view(), name='contact-submit'),
    path('cookie-consent/', CookieConsentCreateAPIView.as_view(), name='cookie-consent-submit'),
    path('project-estimates/', ProjectEstimateCreateAPIView.as_view(), name='project-estimate-submit'),
    path('client-logos/', ClientLogoPublicAPIView.as_view(), name='client-logos-public'),
]
