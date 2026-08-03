from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class AdminUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, password, **extra_fields)

class AdminUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, db_index=True)
    name = models.CharField(max_length=255, default='Administrator')
    role = models.CharField(max_length=50, default='admin')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AdminUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class AdminLoginLog(models.Model):
    user = models.ForeignKey(AdminUser, on_delete=models.CASCADE, related_name='login_logs')
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, default='')
    token = models.TextField(help_text="JWT Token issued for session")
    login_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    logout_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-login_at']

    def __str__(self):
        return f"{self.user.email} - {self.ip_address} ({self.login_at.strftime('%Y-%m-%d %H:%M')})"

    @property
    def time_spent_seconds(self):
        from django.utils import timezone
        end_time = self.logout_at or self.last_activity or timezone.now()
        if self.login_at and end_time:
            return int((end_time - self.login_at).total_seconds())
        return 0


class AdminOTP(models.Model):
    user = models.ForeignKey(AdminUser, on_delete=models.CASCADE, related_name='otps')
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"OTP {self.otp_code} for {self.user.email}"

    def is_valid(self):
        from django.utils import timezone
        return not self.is_used and timezone.now() <= self.expires_at


