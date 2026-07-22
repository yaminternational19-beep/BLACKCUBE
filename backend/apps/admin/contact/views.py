from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ContactSubmission, ProjectEstimate
from .serializers import ContactSubmissionAdminSerializer
from apps.website.contact.serializers import ProjectEstimateSerializer

class ContactSubmissionListAPIView(generics.ListAPIView):
    queryset = ContactSubmission.objects.all().order_by('-created_at')
    serializer_class = ContactSubmissionAdminSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'data': serializer.data})

class ContactSubmissionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionAdminSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'data': serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'success': True, 'message': 'Deleted successfully'})


class ProjectEstimateListAPIView(generics.ListAPIView):
    queryset = ProjectEstimate.objects.all().order_by('-created_at')
    serializer_class = ProjectEstimateSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'data': serializer.data})

class ProjectEstimateDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectEstimate.objects.all()
    serializer_class = ProjectEstimateSerializer
    permission_classes = [IsAuthenticated]

