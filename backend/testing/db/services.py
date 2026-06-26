import time
import logging
from django.db import connection
from django.conf import settings

logger = logging.getLogger(__name__)

def check_database_health():
    db_config = settings.DATABASES.get('default', {})
    
    health_data = {
        "success": False,
        "database_connected": False,
        "database_name": db_config.get('NAME'),
        "database_user": db_config.get('USER'),
        "database_host": db_config.get('HOST'),
        "database_port": db_config.get('PORT'),
        "engine": db_config.get('ENGINE'),
        "mysql_version": None,
        "server_time": None,
        "response_time_ms": None,
        "migration_table_exists": False,
        "status": "unknown"
    }

    start_time = time.time()
    logger.info("Attempting to connect to the database...")

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            
            cursor.execute("SELECT DATABASE()")
            health_data["active_database"] = cursor.fetchone()[0]
            
            cursor.execute("SELECT VERSION()")
            health_data["mysql_version"] = cursor.fetchone()[0]
            
            cursor.execute("SELECT NOW()")
            health_data["server_time"] = str(cursor.fetchone()[0])
            
            cursor.execute("SHOW TABLES LIKE 'django_migrations'")
            health_data["migration_table_exists"] = bool(cursor.fetchone())

        response_time = (time.time() - start_time) * 1000
        health_data["response_time_ms"] = round(response_time, 2)
        health_data["success"] = True
        health_data["database_connected"] = True
        health_data["status"] = "healthy"
        logger.info(f"Database connection successful. Response time: {health_data['response_time_ms']}ms")

    except Exception as e:
        logger.error(f"Database connection failed: {e}", exc_info=True)
        return {
            "success": False,
            "database_connected": False,
            "error_type": type(e).__name__,
            "error_message": str(e),
            "status": "failed"
        }

    return health_data
