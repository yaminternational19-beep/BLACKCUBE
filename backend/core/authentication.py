from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from core.services.jwt_service import JWTService
from apps.authentication.models import AdminUser

class CustomJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
            
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None
            
        token = parts[1]
        try:
            payload = JWTService.decode_token(token)
            user_id = payload.get('user_id')
            if not user_id:
                raise AuthenticationFailed('Token payload invalid')
                
            admin_user = AdminUser.objects.get(id=user_id, is_active=True)
            return (admin_user, token)
        except ValueError as e:
            raise AuthenticationFailed(str(e))
        except AdminUser.DoesNotExist:
            raise AuthenticationFailed('User not found or inactive')
