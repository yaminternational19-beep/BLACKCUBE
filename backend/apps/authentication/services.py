from core.services.jwt_service import JWTService
from django.contrib.auth import authenticate
from apps.authentication.models import AdminUser

class AdminAuthService:
    @staticmethod
    def authenticate_admin(email, password):
        user = authenticate(email=email, password=password)
        if not user:
            return None, "Invalid email or password."
            
        if not user.is_active:
            return None, "Your account is disabled."

        payload = {
            "user_id": user.id,
            "email": user.email,
            "role": getattr(user, 'role', 'admin'),
            "aud": "blackcube-admin"
        }
        
        token = JWTService.generate_token(payload, expires_in_seconds=86400)
        
        return {
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": getattr(user, 'name', ''),
                "role": getattr(user, 'role', 'admin')
            }
        }, None
