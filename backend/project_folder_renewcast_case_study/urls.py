from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from app_api.views import api

def home(request):
    return HttpResponse("Go to /api to fetch the data")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
    path("", home)
]
