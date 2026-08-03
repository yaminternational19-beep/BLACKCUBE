from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from core.response.api_response import success_response, error_response
from core.services.statuscodes import StatusCodes
from .services import AdminAuthService

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')
        otp = data.get('otp') or data.get('otp_code')

        # If OTP is provided, perform Step 2: Verification
        if otp:
            if not email:
                return error_response(
                    message="Email is required for OTP verification.",
                    status_code=StatusCodes.BAD_REQUEST
                )
            auth_data, error_msg = AdminAuthService.verify_otp(email, otp, request)
            if error_msg:
                return error_response(
                    message=error_msg,
                    errors={"auth": error_msg},
                    status_code=StatusCodes.UNAUTHORIZED
                )
            return success_response(
                message="Admin login successful",
                data=auth_data,
                status_code=StatusCodes.OK
            )

        # Step 1: Validate credentials and send OTP
        if not email or not password:
            return error_response(
                message="Please provide both email and password.",
                errors={"validation": "Email and password are required"},
                status_code=StatusCodes.BAD_REQUEST
            )

        result, error_msg = AdminAuthService.request_otp(email, password)
        
        if error_msg:
            return error_response(
                message=error_msg,
                errors={"auth": error_msg},
                status_code=StatusCodes.UNAUTHORIZED
            )

        return success_response(
            message=result["message"],
            data=result,
            status_code=StatusCodes.OK
        )

    except Exception as e:
        return error_response(
            message="Internal server error occurred",
            errors={"server": str(e)},
            status_code=StatusCodes.INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    try:
        data = request.data
        email = data.get('email')
        otp = data.get('otp') or data.get('otp_code')

        if not email or not otp:
            return error_response(
                message="Please provide both email and OTP code.",
                errors={"validation": "Email and OTP code are required"},
                status_code=StatusCodes.BAD_REQUEST
            )

        auth_data, error_msg = AdminAuthService.verify_otp(email, otp, request)
        if error_msg:
            return error_response(
                message=error_msg,
                errors={"auth": error_msg},
                status_code=StatusCodes.UNAUTHORIZED
            )

        return success_response(
            message="Admin login successful",
            data=auth_data,
            status_code=StatusCodes.OK
        )

    except Exception as e:
        return error_response(
            message="Internal server error occurred",
            errors={"server": str(e)},
            status_code=StatusCodes.INTERNAL_SERVER_ERROR
        )

