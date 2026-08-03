import random
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from core.services.jwt_service import JWTService
from django.contrib.auth import authenticate
from apps.authentication.models import AdminUser, AdminLoginLog, AdminOTP

class AdminAuthService:
    @staticmethod
    def request_otp(email, password):
        user = authenticate(email=email, password=password)
        if not user:
            return None, "Invalid email or password."
            
        if not user.is_active:
            return None, "Your account is disabled."

        # Check 30-second resend cooldown
        recent_otp = AdminOTP.objects.filter(user=user).order_by('-created_at').first()
        if recent_otp:
            time_elapsed = (timezone.now() - recent_otp.created_at).total_seconds()
            if time_elapsed < 30:
                seconds_left = max(1, int(30 - time_elapsed))
                return None, f"Please wait {seconds_left} seconds before requesting a new OTP."

        # Invalidate previous unused OTPs for this user
        AdminOTP.objects.filter(user=user, is_used=False).update(is_used=True)

        # Generate a 6-digit random OTP
        otp_code = f"{random.randint(100000, 999999)}"
        expires_at = timezone.now() + timedelta(minutes=5)

        AdminOTP.objects.create(
            user=user,
            otp_code=otp_code,
            expires_at=expires_at
        )

        # Send email notification with OTP
        try:
            user_name = getattr(user, 'name', 'Administrator') or 'Administrator'
            subject = f"Your BlackCube Admin Verification Code: {otp_code}"
            message = (
                f"Hello {user_name},\n\n"
                f"Your 6-digit OTP verification code for signing into BlackCube Admin panel is:\n\n"
                f"   [ {otp_code} ]\n\n"
                f"This code will expire in 5 minutes. If you did not request this login, please contact your administrator immediately.\n\n"
                f"Best regards,\n"
                f"BlackCube Solutions Security Team"
            )
            send_mail(
                subject,
                message,
                getattr(settings, 'DEFAULT_FROM_EMAIL', 'no-reply@blackcube.ae'),
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"OTP Email delivery warning for {user.email}: {e}")

        return {
            "otp_required": True,
            "email": user.email,
            "message": f"Verification code sent to {user.email}"
        }, None

    @staticmethod
    def verify_otp(email, otp_code, request=None):
        if not email or not otp_code:
            return None, "Email and OTP code are required."

        try:
            user = AdminUser.objects.get(email__iexact=email.strip())
        except AdminUser.DoesNotExist:
            return None, "Invalid user credentials."

        if not user.is_active:
            return None, "Your account is disabled."

        clean_otp = str(otp_code).strip()
        otp_record = AdminOTP.objects.filter(
            user=user,
            otp_code=clean_otp,
            is_used=False,
            expires_at__gte=timezone.now()
        ).first()

        if not otp_record:
            return None, "Invalid or expired OTP code."

        # Mark OTP as used
        otp_record.is_used = True
        otp_record.save()

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

    @staticmethod
    def authenticate_admin(email, password, request=None):
        return AdminAuthService.request_otp(email, password)


