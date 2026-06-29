from rest_framework import generics
from rest_framework.response import Response
from .models import ContactSubmission
from .serializers import ContactSubmissionAdminSerializer

class ContactSubmissionListAPIView(generics.ListAPIView):
    queryset = ContactSubmission.objects.all().order_by('-created_at')
    serializer_class = ContactSubmissionAdminSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'data': serializer.data})

class ContactSubmissionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionAdminSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'Deleted successfully'})
