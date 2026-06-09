from __future__ import annotations

from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.home_content, name="content-home"),
    path("settings/", views.site_settings, name="content-settings"),
    path("services/", views.services_list, name="content-services"),
    path("services/<slug:slug>/", views.service_detail, name="content-service-detail"),
    path("faq/", views.faq_list, name="content-faq"),
    path("reviews/", views.reviews_list, name="content-reviews"),
    path("work-stages/", views.work_stages_list, name="content-work-stages"),
    path("advantages/", views.advantages_list, name="content-advantages"),
]
