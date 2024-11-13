"""
WSGI config for project_folder_renewcast_case_study project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "project_folder_renewcast_case_study.settings"
)

application = get_wsgi_application()
