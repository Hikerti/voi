from __future__ import annotations

from django.core.validators import MinValueValidator
from django.db import models


class PublishStatus(models.TextChoices):
    DRAFT = "draft", "Черновик"
    PUBLISHED = "published", "Опубликовано"
    HIDDEN = "hidden", "Скрыто"


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    class Meta:
        abstract = True


class SeoFieldsModel(models.Model):
    seo_title = models.CharField("SEO Title", max_length=255, blank=True)
    seo_description = models.TextField("SEO Description", blank=True)
    seo_keywords = models.CharField("SEO Keywords", max_length=255, blank=True)
    h1 = models.CharField("H1", max_length=255, blank=True)

    class Meta:
        abstract = True


class SiteSettings(TimeStampedModel, SeoFieldsModel):
    site_name = models.CharField("Название сайта", max_length=120, default="Voitov Studio")
    tagline = models.CharField("Слоган", max_length=255, blank=True)
    phone_primary = models.CharField("Телефон 1", max_length=32, blank=True)
    phone_secondary = models.CharField("Телефон 2", max_length=32, blank=True)
    email = models.EmailField("Email", blank=True)
    work_time = models.CharField("Время работы", max_length=120, blank=True)
    address = models.TextField("Адрес", blank=True)
    ogrn = models.CharField("ОГРН", max_length=32, blank=True)
    inn = models.CharField("ИНН", max_length=32, blank=True)
    whatsapp_url = models.URLField("WhatsApp", blank=True)
    telegram_url = models.URLField("Telegram", blank=True)
    vk_url = models.URLField("VK", blank=True)
    map_embed_url = models.URLField("Ссылка на карту", blank=True)
    privacy_url = models.CharField("Ссылка на политику", max_length=255, default="/privacy")

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self) -> str:
        return self.site_name


class ServiceCategory(TimeStampedModel, SeoFieldsModel):
    title = models.CharField("Название", max_length=160)
    slug = models.SlugField("Slug", max_length=180, unique=True)
    description = models.TextField("Описание", blank=True)
    sort_order = models.PositiveIntegerField("Сортировка", default=100, validators=[MinValueValidator(0)])
    status = models.CharField("Статус", max_length=20, choices=PublishStatus.choices, default=PublishStatus.PUBLISHED)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "Категория услуг"
        verbose_name_plural = "Категории услуг"

    def __str__(self) -> str:
        return self.title


class Service(TimeStampedModel, SeoFieldsModel):
    category = models.ForeignKey(ServiceCategory, verbose_name="Категория", related_name="services", on_delete=models.PROTECT)
    title = models.CharField("Название", max_length=180)
    slug = models.SlugField("Slug", max_length=200, unique=True)
    price = models.CharField("Цена", max_length=80, blank=True)
    summary = models.TextField("Краткое описание", blank=True)
    description = models.TextField("Полное описание", blank=True)
    seo_text = models.TextField("SEO-текст", blank=True)
    image = models.ImageField("Изображение", upload_to="services/", blank=True)
    related_services = models.ManyToManyField("self", verbose_name="Похожие услуги", blank=True, symmetrical=False)
    sort_order = models.PositiveIntegerField("Сортировка", default=100, validators=[MinValueValidator(0)])
    status = models.CharField("Статус", max_length=20, choices=PublishStatus.choices, default=PublishStatus.PUBLISHED)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self) -> str:
        return self.title


class Advantage(TimeStampedModel):
    title = models.CharField("Заголовок", max_length=160)
    text = models.TextField("Текст", blank=True)
    icon = models.ImageField("Иконка", upload_to="advantages/", blank=True)
    sort_order = models.PositiveIntegerField("Сортировка", default=100, validators=[MinValueValidator(0)])
    status = models.CharField("Статус", max_length=20, choices=PublishStatus.choices, default=PublishStatus.PUBLISHED)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "Преимущество"
        verbose_name_plural = "Преимущества"

    def __str__(self) -> str:
        return self.title


class WorkStage(TimeStampedModel):
    title = models.CharField("Название этапа", max_length=160)
    description = models.TextField("Описание", blank=True)
    sort_order = models.PositiveIntegerField("Сортировка", default=100, validators=[MinValueValidator(0)])
    status = models.CharField("Статус", max_length=20, choices=PublishStatus.choices, default=PublishStatus.PUBLISHED)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "Этап работы"
        verbose_name_plural = "Этапы работы"

    def __str__(self) -> str:
        return self.title


class FAQItem(TimeStampedModel, SeoFieldsModel):
    question = models.CharField("Вопрос", max_length=255)
    slug = models.SlugField("Slug", max_length=200, unique=True)
    short_answer = models.TextField("Короткий ответ", blank=True)
    full_answer = models.TextField("Полный ответ", blank=True)
    sort_order = models.PositiveIntegerField("Сортировка", default=100, validators=[MinValueValidator(0)])
    status = models.CharField("Статус", max_length=20, choices=PublishStatus.choices, default=PublishStatus.PUBLISHED)

    class Meta:
        ordering = ["sort_order", "question"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQ"

    def __str__(self) -> str:
        return self.question


class Review(TimeStampedModel):
    name = models.CharField("Имя", max_length=120)
    email = models.EmailField("Email", blank=True)
    text = models.TextField("Текст отзыва")
    review_date = models.DateField("Дата отзыва", null=True, blank=True)
    sort_order = models.PositiveIntegerField("Сортировка", default=100, validators=[MinValueValidator(0)])
    status = models.CharField("Статус", max_length=20, choices=PublishStatus.choices, default=PublishStatus.DRAFT)

    class Meta:
        ordering = ["sort_order", "-created_at"]
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

    def __str__(self) -> str:
        return f"{self.name}: {self.text[:40]}"
