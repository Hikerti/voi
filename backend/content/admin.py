from __future__ import annotations

from django.contrib import admin

from .models import Advantage, FAQItem, Review, Service, ServiceCategory, SiteSettings, WorkStage


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Основное", {"fields": ("site_name", "tagline", "privacy_url")}),
        ("Контакты", {"fields": ("phone_primary", "phone_secondary", "email", "work_time", "address")}),
        ("Реквизиты", {"fields": ("ogrn", "inn")}),
        ("Мессенджеры и соцсети", {"fields": ("whatsapp_url", "telegram_url", "vk_url", "map_embed_url")}),
        ("SEO главной", {"fields": ("h1", "seo_title", "seo_description", "seo_keywords")}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "status", "sort_order", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("sort_order", "title")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "price", "status", "sort_order", "updated_at")
    list_filter = ("status", "category")
    search_fields = ("title", "summary", "description", "seo_text")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("related_services",)
    ordering = ("sort_order", "title")
    fieldsets = (
        ("Основное", {"fields": ("category", "title", "slug", "price", "summary", "description", "seo_text", "image")}),
        ("Похожие услуги", {"fields": ("related_services",)}),
        ("Публикация", {"fields": ("status", "sort_order")}),
        ("SEO", {"fields": ("h1", "seo_title", "seo_description", "seo_keywords")}),
    )


@admin.register(Advantage)
class AdvantageAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "sort_order", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "text")
    ordering = ("sort_order", "title")


@admin.register(WorkStage)
class WorkStageAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "sort_order", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "description")
    ordering = ("sort_order", "title")


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ("question", "slug", "status", "sort_order", "updated_at")
    list_filter = ("status",)
    search_fields = ("question", "short_answer", "full_answer")
    prepopulated_fields = {"slug": ("question",)}
    ordering = ("sort_order", "question")
    fieldsets = (
        ("Основное", {"fields": ("question", "slug", "short_answer", "full_answer")}),
        ("Публикация", {"fields": ("status", "sort_order")}),
        ("SEO", {"fields": ("h1", "seo_title", "seo_description", "seo_keywords")}),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "review_date", "sort_order", "updated_at")
    list_filter = ("status", "review_date")
    search_fields = ("name", "email", "text")
    ordering = ("sort_order", "-created_at")
