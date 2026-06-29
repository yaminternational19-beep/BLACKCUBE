from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.admin.footer.models import Footer
from apps.admin.footer.serializers import FooterSerializer
from rest_framework.permissions import AllowAny

class FooterPublicAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        footer = Footer.objects.first()
        if footer:
            serializer = FooterSerializer(footer)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_200_OK)
