from django.db import migrations

def seed_admin_users(apps, schema_editor):
    AdminUser = apps.get_model('authentication', 'AdminUser')
    from django.contrib.auth.hashers import make_password

    admin_accounts = [
        ('admin@blackcube.ae', 'admin123', 'Administrator'),
        ('praveen@blackcube.ae', 'admin123', 'Praveen Reddy'),
        ('ramlakhan@blackcube.ae', 'admin123', 'Ram Lakhan')
    ]

    for email, password, name in admin_accounts:
        user = AdminUser.objects.filter(email__iexact=email).first()
        if user:
            user.name = name
            user.password = make_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.save()
        else:
            AdminUser.objects.create(
                email=email,
                password=make_password(password),
                name=name,
                role='admin',
                is_staff=True,
                is_superuser=True,
                is_active=True
            )

def remove_admin_users(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_adminotp'),
    ]

    operations = [
        migrations.RunPython(seed_admin_users, remove_admin_users),
    ]
