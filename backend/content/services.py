from __future__ import annotations

from typing import Any

from .repositories import ContentRepository


class ContentService:
    def __init__(self, repository: ContentRepository | None = None) -> None:
        self.repository = repository or ContentRepository()

    def get_home_content(self) -> dict[str, Any]:
        return {
            "settings": self.repository.get_site_settings(),
            "services": self.repository.list_services(),
            "workStages": self.repository.list_work_stages(),
            "advantages": self.repository.list_advantages(),
            "reviews": self.repository.list_reviews(),
            "faq": self.repository.list_faq(),
        }

    def list_services(self) -> list[dict[str, Any]]:
        return self.repository.list_services()

    def get_service_detail(self, slug: str) -> dict[str, Any] | None:
        if not slug or len(slug) > 200:
            return None
        return self.repository.get_service_by_slug(slug)

    def list_faq(self) -> list[dict[str, Any]]:
        return self.repository.list_faq()

    def list_reviews(self) -> list[dict[str, Any]]:
        return self.repository.list_reviews()

    def list_work_stages(self) -> list[dict[str, Any]]:
        return self.repository.list_work_stages()

    def list_advantages(self) -> list[dict[str, Any]]:
        return self.repository.list_advantages()

    def get_site_settings(self) -> dict[str, Any] | None:
        return self.repository.get_site_settings()
