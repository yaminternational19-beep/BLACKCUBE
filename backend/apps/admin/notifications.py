from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from apps.admin.contact.models import ContactSubmission
from apps.admin.jobs.models import JobApplication

class UnreadCountsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        contact_count = ContactSubmission.objects.filter(is_read=False).count()
        job_count = JobApplication.objects.filter(is_read=False).count()
        
        return Response({
            "success": True,
            "data": {
                "contact_submissions": contact_count,
                "job_applications": job_count
            }
        })
