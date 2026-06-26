from django.apps import AppConfig


class TestingConfig(AppConfig):
    name = 'apps.testing'
    label = 'testing'

    def ready(self):
        import sys
        # Only run on runserver to prevent execution on migrate/collectstatic
        if 'runserver' in sys.argv:
            from django.conf import settings
            try:
                from testing.db.services import check_database_health
                
                print("\n" + "="*40)
                print("--- Startup Database Check ---")
                
                db_config = settings.DATABASES.get('default', {})
                print(f"Host: {db_config.get('HOST')}")
                print(f"Port: {db_config.get('PORT')}")
                print(f"User: {db_config.get('USER')}")
                print(f"Database: {db_config.get('NAME')}")
                
                res = check_database_health()
                
                if res.get('success'):
                    print("\n✓ Database Connected")
                else:
                    print("\n✗ Database Connection Failed")
                    print(f"Error: {res.get('error_type')} - {res.get('error_message')}")
                print("="*40 + "\n")
            except ImportError:
                pass
