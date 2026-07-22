from rest_framework import generics
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from apps.admin.contact.models import ContactSubmission, CookieConsent, PURPOSE_CHOICES
from .serializers import ContactSubmissionCreateSerializer, CookieConsentSerializer

class ContactSubmissionCreateView(generics.CreateAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionCreateSerializer
    permission_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            
            # 1. Send Visitor Auto-Reply Email
            try:
                user_subject = "Thank you for contacting BlackCube Solutions!"
                user_message = (
                    f"Hello {instance.name},\n\n"
                    f"Thank you for reaching out to BlackCube Solutions! We have received your inquiry regarding '{getattr(instance, 'subject', 'General Inquiry')}'.\n\n"
                    f"Our team is reviewing your message and will get in touch with you within 24 hours.\n\n"
                    f"Inquiry Summary:\n"
                    f"- Name: {instance.name}\n"
                    f"- Service: {getattr(instance, 'service', 'N/A')}\n"
                    f"- Subject: {getattr(instance, 'subject', 'N/A')}\n\n"
                    f"Warm regards,\n"
                    f"The BlackCube Team\n"
                    f"https://blackcube.in"
                )
                send_mail(
                    user_subject,
                    user_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [instance.email],
                    fail_silently=True,
                )
            except Exception:
                pass

            # 2. Send Email Notification to Admin
            try:
                subject = f"New Contact Inquiry from {instance.name}"
                message = f"You received a new contact submission on BlackCube:\n\nName: {instance.name}\nEmail: {instance.email}\nPhone: {getattr(instance, 'phone', 'N/A')}\nSubject: {getattr(instance, 'subject', 'N/A')}\n\nMessage:\n{instance.message}"
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_NOTIFICATION_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass
                
            return Response({'success': True, 'data': serializer.data})
        return Response({'success': False, 'errors': serializer.errors}, status=400)


class CookieConsentCreateAPIView(generics.CreateAPIView):
    queryset = CookieConsent.objects.all()
    serializer_class = CookieConsentSerializer
    permission_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Capture IP and User Agent
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0].strip()
            else:
                ip = request.META.get('REMOTE_ADDR', '')
                
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            
            instance = serializer.save(ip_address=ip, user_agent=user_agent)
            
            # If visitor provided their email, send Welcome Email & Admin Alert
            if instance.email:
                purpose_dict = dict(PURPOSE_CHOICES)
                purpose_display = purpose_dict.get(instance.purpose_of_visit, instance.purpose_of_visit or "Exploring BlackCube")
                
                # 1. Visitor Thank-You Email
                try:
                    visitor_subject = "Thank You for Visiting BlackCube!"
                    visitor_message = (
                        f"Hello!\n\n"
                        f"Thank you for visiting BlackCube and connecting with us.\n"
                        f"We noted your area of interest: {purpose_display}.\n\n"
                        f"Our team develops cutting-edge digital products, web solutions, and software.\n"
                        f"If you'd like to discuss a project or have any questions, feel free to reply directly to this email.\n\n"
                        f"Warm regards,\n"
                        f"The BlackCube Team\n"
                        f"https://blackcube.in"
                    )
                    send_mail(
                        visitor_subject,
                        visitor_message,
                        settings.DEFAULT_FROM_EMAIL,
                        [instance.email],
                        fail_silently=True,
                    )
                except Exception:
                    pass
                
                # 2. Admin Alert Email
                try:
                    admin_subject = f"New Visitor Lead: {instance.email}"
                    admin_message = (
                        f"A visitor has accepted cookie consent and shared their contact details:\n\n"
                        f"Email: {instance.email}\n"
                        f"Purpose of Visit: {purpose_display}\n"
                        f"IP Address: {ip}\n"
                        f"Timestamp: {instance.created_at}"
                    )
                    send_mail(
                        admin_subject,
                        admin_message,
                        settings.DEFAULT_FROM_EMAIL,
                        [settings.ADMIN_NOTIFICATION_EMAIL],
                        fail_silently=True,
                    )
                except Exception:
                    pass

            return Response({'success': True, 'data': serializer.data})
        return Response({'success': False, 'errors': serializer.errors}, status=400)


from apps.admin.portfolio.models import ClientLogo
from apps.admin.portfolio.serializers import ClientLogoSerializer
from apps.admin.contact.models import ProjectEstimate
from .serializers import ProjectEstimateSerializer

class ProjectEstimateCreateAPIView(generics.CreateAPIView):
    queryset = ProjectEstimate.objects.all()
    serializer_class = ProjectEstimateSerializer
    permission_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            
            # Send Visitor Thank You Email
            try:
                subject = f"We Received Your Project Estimate Request - BlackCube"
                message = (
                    f"Hello {instance.name},\n\n"
                    f"Thank you for requesting a project estimate for {instance.project_type}.\n"
                    f"Our technical architecture team is reviewing your requirements and will reach out with a detailed estimate and project roadmap.\n\n"
                    f"Estimate Request Summary:\n"
                    f"- Project Type: {instance.project_type}\n"
                    f"- Budget Range: {instance.budget_range or 'Custom'}\n"
                    f"- Desired Timeline: {instance.timeline or 'Flexible'}\n\n"
                    f"Best regards,\n"
                    f"The BlackCube Team\n"
                    f"https://blackcube.in"
                )
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [instance.email],
                    fail_silently=True,
                )
            except Exception:
                pass

            # Send Admin Alert Email
            try:
                admin_subject = f"🔥 New Project Estimate Lead: {instance.name} ({instance.project_type})"
                admin_message = (
                    f"You received a new high-intent project estimate request on BlackCube:\n\n"
                    f"Name: {instance.name}\n"
                    f"Email: {instance.email}\n"
                    f"Phone: {instance.phone or 'N/A'}\n"
                    f"Company: {instance.company or 'N/A'}\n"
                    f"Project Type: {instance.project_type}\n"
                    f"Scope: {instance.scope or 'N/A'}\n"
                    f"Budget Range: {instance.budget_range or 'N/A'}\n"
                    f"Timeline: {instance.timeline or 'N/A'}\n\n"
                    f"Description:\n{instance.description or 'N/A'}"
                )
                send_mail(
                    admin_subject,
                    admin_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_NOTIFICATION_EMAIL],
                    fail_silently=True,
                )
            except Exception:
                pass

            return Response({'success': True, 'data': serializer.data})
        return Response({'success': False, 'errors': serializer.errors}, status=400)


class ClientLogoPublicAPIView(generics.ListAPIView):
    queryset = ClientLogo.objects.filter(is_active=True).order_by('index_value', '-created_at')
    serializer_class = ClientLogoSerializer
    permission_classes = []

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'data': serializer.data})



