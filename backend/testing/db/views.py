from django.http import JsonResponse
from .services import check_database_health

def db_connectivity_view(request):
    result = check_database_health()
    status_code = 200 if result.get("success") else 500
    return JsonResponse(result, status=status_code)
