from __future__ import annotations

from typing import Any

from django.db import connection

PUBLISHED = "published"

ALLOWED_PUBLIC_TABLES = {
    "service_categories": "content_servicecategory",
    "services": "content_service",
    "advantages": "content_advantage",
    "work_stages": "content_workstage",
    "faq": "content_faqitem",
    "reviews": "content_review",
}


def dictfetchall(cursor) -> list[dict[str, Any]]:
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


class ContentRepository:
    """Read-only public content repository.

    Raw SQL is intentionally kept in this layer only. Values are always passed as
    query params; table names are selected from an allow-list and never accepted
    directly from user input.
    """

    def list_services(self) -> list[dict[str, Any]]:
        query = """
            SELECT
                s.id,
                s.title,
                s.slug,
                s.price,
                s.summary,
                s.description,
                s.seo_text,
                s.image,
                s.sort_order,
                s.seo_title,
                s.seo_description,
                s.seo_keywords,
                s.h1,
                c.title AS category_title,
                c.slug AS category_slug
            FROM content_service AS s
            INNER JOIN content_servicecategory AS c ON c.id = s.category_id
            WHERE s.status = %s AND c.status = %s
            ORDER BY s.sort_order ASC, s.title ASC
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [PUBLISHED, PUBLISHED])
            return dictfetchall(cursor)

    def get_service_by_slug(self, slug: str) -> dict[str, Any] | None:
        query = """
            SELECT
                s.id,
                s.title,
                s.slug,
                s.price,
                s.summary,
                s.description,
                s.seo_text,
                s.image,
                s.sort_order,
                s.seo_title,
                s.seo_description,
                s.seo_keywords,
                s.h1,
                c.title AS category_title,
                c.slug AS category_slug
            FROM content_service AS s
            INNER JOIN content_servicecategory AS c ON c.id = s.category_id
            WHERE s.slug = %s AND s.status = %s AND c.status = %s
            LIMIT 1
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [slug, PUBLISHED, PUBLISHED])
            rows = dictfetchall(cursor)
        return rows[0] if rows else None

    def list_faq(self) -> list[dict[str, Any]]:
        query = """
            SELECT id, question, slug, short_answer, full_answer, sort_order,
                   seo_title, seo_description, seo_keywords, h1
            FROM content_faqitem
            WHERE status = %s
            ORDER BY sort_order ASC, question ASC
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [PUBLISHED])
            return dictfetchall(cursor)

    def list_reviews(self) -> list[dict[str, Any]]:
        query = """
            SELECT id, name, text, review_date, sort_order
            FROM content_review
            WHERE status = %s
            ORDER BY sort_order ASC, created_at DESC
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [PUBLISHED])
            return dictfetchall(cursor)

    def list_work_stages(self) -> list[dict[str, Any]]:
        query = """
            SELECT id, title, description, sort_order
            FROM content_workstage
            WHERE status = %s
            ORDER BY sort_order ASC, title ASC
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [PUBLISHED])
            return dictfetchall(cursor)

    def list_advantages(self) -> list[dict[str, Any]]:
        query = """
            SELECT id, title, text, icon, sort_order
            FROM content_advantage
            WHERE status = %s
            ORDER BY sort_order ASC, title ASC
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [PUBLISHED])
            return dictfetchall(cursor)

    def get_site_settings(self) -> dict[str, Any] | None:
        query = """
            SELECT id, site_name, tagline, phone_primary, phone_secondary, email,
                   work_time, address, ogrn, inn, whatsapp_url, telegram_url,
                   vk_url, map_embed_url, privacy_url, seo_title, seo_description,
                   seo_keywords, h1
            FROM content_sitesettings
            ORDER BY id ASC
            LIMIT 1
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = dictfetchall(cursor)
        return rows[0] if rows else None
