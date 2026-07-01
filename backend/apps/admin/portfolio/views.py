from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import PortfolioItem
from .serializers import PortfolioItemSerializer

class PortfolioItemViewSet(viewsets.ModelViewSet):
    queryset = PortfolioItem.objects.select_related('category').prefetch_related('technologies', 'methods', 'team_members__role').all().order_by('index_value', '-created_at')
    serializer_class = PortfolioItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
