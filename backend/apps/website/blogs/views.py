from rest_framework.decorators import api_view
from core.response.api_response import success_response, error_response
from core.services.statuscodes import StatusCodes
from .services import WebsiteBlogService

@api_view(['GET'])
def website_blogs(request):
    try:
        data = WebsiteBlogService.get_all()
        return success_response(message="Fetched successfully", data=data)
    except Exception as e:
        return error_response(message="Failed to fetch", errors={"server": str(e)}, status_code=StatusCodes.INTERNAL_SERVER_ERROR)
