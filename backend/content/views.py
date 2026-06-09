from __future__ import annotations

from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import ContentService


@api_view(["GET"])
def home_content(_request):
    return Response(ContentService().get_home_content())


@api_view(["GET"])
def site_settings(_request):
    settings = ContentService().get_site_settings()
    return Response(settings or {})


@api_view(["GET"])
def services_list(_request):
    return Response(ContentService().list_services())


@api_view(["GET"])
def service_detail(_request, slug: str):
    service = ContentService().get_service_detail(slug)
    if service is None:
        raise Http404("Service not found")
    return Response(service)


@api_view(["GET"])
def faq_list(_request):
    return Response(ContentService().list_faq())


@api_view(["GET"])
def reviews_list(_request):
    return Response(ContentService().list_reviews())


@api_view(["GET"])
def work_stages_list(_request):
    return Response(ContentService().list_work_stages())


@api_view(["GET"])
def advantages_list(_request):
    return Response(ContentService().list_advantages())
