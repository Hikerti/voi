import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  private readonly published = { status: PublishStatus.PUBLISHED };

  constructor(private readonly prisma: PrismaService) {}

  getSiteSettings() {
    return this.prisma.siteSettings.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        brandName: 'Voitov Studio',
        tagline: 'Креативные сайты и цифровые продукты',
        policyUrl: '/privacy',
        seoTitle: 'Voitov Studio - сайты и digital-дизайн',
        seoDescription:
          'Voitov Studio проектирует и разрабатывает креативные сайты, лендинги и digital-продукты.',
      },
    });
  }

  getServices() {
    return this.prisma.service.findMany({
      where: this.published,
      include: {
        category: true,
        pricePackages: {
          where: this.published,
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  async getServiceBySlug(slug: string) {
    const service = await this.prisma.service.findFirst({
      where: { slug, ...this.published },
      include: {
        category: true,
        pricePackages: {
          where: this.published,
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        },
        relatedServices: {
          include: {
            related: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return {
      ...service,
      relatedServices: service.relatedServices
        .map(({ related }) => related)
        .filter((related) => related.status === PublishStatus.PUBLISHED),
    };
  }

  getServiceCategories() {
    return this.prisma.serviceCategory.findMany({
      where: this.published,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  getPricePackages() {
    return this.prisma.pricePackage.findMany({
      where: this.published,
      include: { service: true },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  getAdvantages() {
    return this.prisma.advantage.findMany({
      where: this.published,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  getWorkStages() {
    return this.prisma.workStage.findMany({
      where: this.published,
      orderBy: [{ sortOrder: 'asc' }, { stepNumber: 'asc' }, { id: 'asc' }],
    });
  }

  getReviews() {
    return this.prisma.review.findMany({
      where: this.published,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  getFAQ() {
    return this.prisma.fAQItem.findMany({
      where: this.published,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  async getFAQBySlug(slug: string) {
    const item = await this.prisma.fAQItem.findFirst({
      where: { slug, ...this.published },
    });

    if (!item) {
      throw new NotFoundException('FAQ item not found');
    }

    return item;
  }

  getNews() {
    return this.prisma.newsPost.findMany({
      where: this.published,
      orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  async getNewsBySlug(slug: string) {
    const post = await this.prisma.newsPost.findFirst({
      where: { slug, ...this.published },
    });

    if (!post) {
      throw new NotFoundException('News post not found');
    }

    return post;
  }

  getArticles() {
    return this.prisma.article.findMany({
      where: this.published,
      orderBy: [{ publishedAt: 'desc' }, { sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  async getArticleBySlug(slug: string) {
    const article = await this.prisma.article.findFirst({
      where: { slug, ...this.published },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  getProjects() {
    return this.prisma.project.findMany({
      where: this.published,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
  }

  async getProjectBySlug(slug: string) {
    const project = await this.prisma.project.findFirst({
      where: { slug, ...this.published },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }
}
