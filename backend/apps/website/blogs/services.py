from apps.admin.blogs.models import Blog
from apps.admin.blogs.serializers import BlogSerializer

class WebsiteBlogService:
    @staticmethod
    def get_all():
        items = Blog.objects.all().order_by('-created_at')
        return BlogSerializer(items, many=True).data
