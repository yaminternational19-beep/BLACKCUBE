from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import PortfolioItem, ClientLogo
from .serializers import PortfolioItemSerializer, ClientLogoSerializer

class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset = PortfolioItem.objects.prefetch_related('technologies', 'methods', 'team_members__role').all().order_by('index_value', '-created_at')
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ClientLogoViewSet(viewsets.ModelViewSet):
    queryset = ClientLogo.objects.all().order_by('index_value', '-created_at')
    serializer_class = ClientLogoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


