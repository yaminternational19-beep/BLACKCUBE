from rest_framework.decorators import api_view
from core.response.api_response import success_response, error_response
from core.services.statuscodes import StatusCodes
from .services import AdminAuthService

@api_view(['POST'])
def admin_login(request):
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return error_response(
                message="Please provide both email and password.",
                errors={"validation": "Email and password are required"},
                status_code=StatusCodes.BAD_REQUEST
            )

        auth_data, error_msg = AdminAuthService.authenticate_admin(email, password)
        
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
