from django.utils.deprecation import MiddlewareMixin
from core.services.jwt_service import JWTService
from apps.authentication.models import AdminUser
from functools import wraps
from core.response.api_response import error_response
from core.services.statuscodes import StatusCodes

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.admin_user = None
        
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return
            
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return
            
        token = parts[1]
        try:
            payload = JWTService.decode_token(token)
            
            user_id = payload.get('user_id')
            if user_id:
                try:
                    admin_user = AdminUser.objects.get(id=user_id, is_active=True)
                    request.admin_user = admin_user
                except AdminUser.DoesNotExist:
                    pass
        except ValueError:
            pass

def jwt_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        if not getattr(request, 'admin_user', None):
            return error_response(
                message="Unauthorized. Valid JWT token is required.",
                errors={"auth": "Missing or invalid token"},
                status_code=StatusCodes.UNAUTHORIZED
            )
        return view_func(request, *args, **kwargs)
    return wrapped_view

def admin_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        user = getattr(request, 'admin_user', None)
        if not user:
            return error_response(
                message="Unauthorized. Valid JWT token is required.",
                errors={"auth": "Missing or invalid token"},
                status_code=StatusCodes.UNAUTHORIZED
            )
            
        if getattr(user, 'role', '') != 'admin':
            return error_response(
                message="Forbidden. Only Admins are authorized to perform this operation.",
                errors={"auth": "Insufficient privileges"},
                status_code=StatusCodes.FORBIDDEN
            )
            
        return view_func(request, *args, **kwargs)
    return wrapped_view
