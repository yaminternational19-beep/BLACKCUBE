from rest_framework.decorators import api_view
from core.response.api_response import success_response, error_response
from core.services.statuscodes import StatusCodes
from core.middleware.jwt_auth import admin_required
from .services import AdminBlogService

@api_view(['GET', 'POST'])
@admin_required
def admin_blogs(request):
    if request.method == 'GET':
        data = AdminBlogService.get_all()
        return success_response(message="Fetched successfully", data=data)
    elif request.method == 'POST':
        data, errors = AdminBlogService.create_item(request.data)
        if errors:
            return error_response(message="Validation failed", errors=errors, status_code=StatusCodes.BAD_REQUEST)
        return success_response(message="Created successfully", data=data, status_code=StatusCodes.CREATED)

@api_view(['PUT', 'DELETE'])
@admin_required
def admin_blogs_detail(request, pk):
    if request.method == 'PUT':
        data, errors = AdminBlogService.update_item(pk, request.data)
        if errors:
            return error_response(message="Validation/Not Found failed", errors=errors, status_code=StatusCodes.BAD_REQUEST)
        return success_response(message="Updated successfully", data=data)
    elif request.method == 'DELETE':
        deleted = AdminBlogService.delete_item(pk)
        if deleted:
            return success_response(message="Deleted successfully")
        return error_response(message="Not found", status_code=StatusCodes.NOT_FOUND)
