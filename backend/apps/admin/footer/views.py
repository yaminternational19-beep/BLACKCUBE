from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Footer
from .serializers import FooterSerializer

class FooterAdminAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        footer = Footer.objects.first()
        if footer:
            serializer = FooterSerializer(footer)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_200_OK)

    def post(self, request):
        footer = Footer.objects.first()
        if footer:
            serializer = FooterSerializer(footer, data=request.data, partial=True)
        else:
            serializer = FooterSerializer(data=request.data)
            
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        return self.post(request)
