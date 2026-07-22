from core.services.jwt_service import JWTService
from django.contrib.auth import authenticate
from apps.authentication.models import AdminUser, AdminLoginLog

class AdminAuthService:
    @staticmethod
    def authenticate_admin(email, password, request=None):
        user = authenticate(email=email, password=password)
        if not user:
            return None, "Invalid email or password."
            
        if not user.is_active:
            return None, "Your account is disabled."

        # JWT Token set to exactly 1 day (24 hours = 86,400 seconds)
        ONE_DAY_IN_SECONDS = 86400

        payload = {
            "user_id": user.id,
            "email": user.email,
            "role": getattr(user, 'role', 'admin'),
            "aud": "blackcube-admin"
        }
        
        token = JWTService.generate_token(payload, expires_in_seconds=ONE_DAY_IN_SECONDS)
        
        # Log IP Address, User Agent, and Token in Database
        ip = None
        user_agent = ''
        if request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0].strip()
            else:
                ip = request.META.get('REMOTE_ADDR', '')
            user_agent = request.META.get('HTTP_USER_AGENT', '')

        login_log = AdminLoginLog.objects.create(
            user=user,
            ip_address=ip,
            user_agent=user_agent,
            token=token,
            is_active=True
        )

        return {
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": getattr(user, 'name', ''),
                "role": getattr(user, 'role', 'admin')
            },
            "session": {
                "id": login_log.id,
                "ip_address": login_log.ip_address,
                "login_at": login_log.login_at
            }
        }, None

