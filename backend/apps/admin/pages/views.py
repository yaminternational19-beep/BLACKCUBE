from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Page
from .serializers import PageSerializer

class PageViewSet(viewsets.ViewSet):
    def list(self, request):
        pages = Page.objects.all()
        serializer = PageSerializer(pages, many=True)
        return Response({
            'success': True,
            'data': serializer.data
        })

    def retrieve(self, request, pk=None):
        try:
            page = Page.objects.get(page_id=pk)
            serializer = PageSerializer(page)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Page.DoesNotExist:
            # For admin panel UX, return a blank template instead of 404
            return Response({
                'success': True,
                'data': {
                    'id': pk,
                    'title': pk.capitalize() + ' Page',
                    'fields': []
                }
            })

    def create(self, request):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': str(serializer.errors)
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            page = Page.objects.get(page_id=pk)
            data = request.data.copy()
            data['id'] = pk
            serializer = PageSerializer(page, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'message': str(serializer.errors)
            }, status=status.HTTP_400_BAD_REQUEST)
        except Page.DoesNotExist:
            # If it doesn't exist, create it
            data = request.data.copy()
            data['id'] = pk
            serializer = PageSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'data': serializer.data
                })
            return Response({
                'success': False,
                'message': str(serializer.errors)
            }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            page = Page.objects.get(page_id=pk)
            page.delete()
            return Response({
                'success': True,
                'message': 'Page deleted successfully'
            })
        except Page.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Page not found'
            }, status=status.HTTP_404_NOT_FOUND)
