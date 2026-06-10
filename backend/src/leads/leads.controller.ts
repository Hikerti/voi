import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LeadKind } from '@prisma/client';
import type { Request } from 'express';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  getLeads() {
    return this.leadsService.findAll();
  }

  @Post('contact')
  createContactLead(@Body() dto: CreateLeadDto, @Req() request: Request) {
    return this.leadsService.create(
      LeadKind.CONTACT,
      dto,
      this.getMeta(request),
    );
  }

  @Post('callback')
  createCallbackLead(@Body() dto: CreateLeadDto, @Req() request: Request) {
    return this.leadsService.create(
      LeadKind.CALLBACK,
      dto,
      this.getMeta(request),
    );
  }

  @Post('review')
  createReviewLead(@Body() dto: CreateLeadDto, @Req() request: Request) {
    return this.leadsService.create(
      LeadKind.REVIEW,
      dto,
      this.getMeta(request),
    );
  }

  @Post('question')
  createQuestionLead(@Body() dto: CreateLeadDto, @Req() request: Request) {
    return this.leadsService.create(
      LeadKind.QUESTION,
      dto,
      this.getMeta(request),
    );
  }

  private getMeta(request: Request) {
    const forwardedFor = request.headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(',')[0]?.trim() || request.ip;

    return {
      ip,
      userAgent: request.headers['user-agent'],
    };
  }
}
