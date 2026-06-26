from rest_framework.decorators import api_view
from core.response.api_response import success_response, error_response
from core.services.statuscodes import StatusCodes
from django.db import connection

@api_view(['GET'])
def health_check(request):
    """
    Basic health check API to verify the server is running.
    """
    return success_response(
        message="Server is healthy and running smoothly.",
        data={"status": "healthy"},
        status_code=StatusCodes.OK
    )

@api_view(['GET'])
def db_check(request):
    """
    Database check API to verify the connection to the database.
    """
    try:
        # Check if we can execute a simple query
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            row = cursor.fetchone()
        
        return success_response(
            message="Database connection is successful.",
            data={"db_status": "connected"},
            status_code=StatusCodes.OK
        )
    except Exception as e:
        return error_response(
            message="Failed to connect to the database.",
            errors={"db_error": str(e)},
            status_code=StatusCodes.INTERNAL_SERVER_ERROR
        )
