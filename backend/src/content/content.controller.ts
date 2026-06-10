import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('site-settings')
  getSiteSettings() {
    return this.contentService.getSiteSettings();
  }

  @Get('service-categories')
  getServiceCategories() {
    return this.contentService.getServiceCategories();
  }

  @Get('services')
  getServices() {
    return this.contentService.getServices();
  }

  @Get('services/:slug')
  getServiceBySlug(@Param('slug') slug: string) {
    return this.contentService.getServiceBySlug(slug);
  }

  @Get('prices')
  getPricePackages() {
    return this.contentService.getPricePackages();
  }

  @Get('advantages')
  getAdvantages() {
    return this.contentService.getAdvantages();
  }

  @Get('work-stages')
  getWorkStages() {
    return this.contentService.getWorkStages();
  }

  @Get('reviews')
  getReviews() {
    return this.contentService.getReviews();
  }

  @Get('faq')
  getFAQ() {
    return this.contentService.getFAQ();
  }

  @Get('faq/:slug')
  getFAQBySlug(@Param('slug') slug: string) {
    return this.contentService.getFAQBySlug(slug);
  }

  @Get('news')
  getNews() {
    return this.contentService.getNews();
  }

  @Get('news/:slug')
  getNewsBySlug(@Param('slug') slug: string) {
    return this.contentService.getNewsBySlug(slug);
  }

  @Get('articles')
  getArticles() {
    return this.contentService.getArticles();
  }

  @Get('articles/:slug')
  getArticleBySlug(@Param('slug') slug: string) {
    return this.contentService.getArticleBySlug(slug);
  }

  @Get('projects')
  getProjects() {
    return this.contentService.getProjects();
  }

  @Get('projects/:slug')
  getProjectBySlug(@Param('slug') slug: string) {
    return this.contentService.getProjectBySlug(slug);
  }
}
