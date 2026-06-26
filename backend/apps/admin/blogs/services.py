from .models import Blog
from .serializers import BlogSerializer

class AdminBlogService:
    @staticmethod
    def get_all():
        items = Blog.objects.all().order_by('-created_at')
        return BlogSerializer(items, many=True).data

    @staticmethod
    def create_item(data):
        serializer = BlogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return serializer.data, None
        return None, serializer.errors

    @staticmethod
    def update_item(pk, data):
        try:
            item = Blog.objects.get(pk=pk)
            serializer = BlogSerializer(item, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return serializer.data, None
            return None, serializer.errors
        except Blog.DoesNotExist:
            return None, {"not_found": f"Blog {pk} not found."}

    @staticmethod
    def delete_item(pk):
        try:
            item = Blog.objects.get(pk=pk)
            item.delete()
            return True
        except Blog.DoesNotExist:
            return False
