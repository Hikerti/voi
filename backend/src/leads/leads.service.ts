import { BadRequestException, Injectable } from '@nestjs/common';
import { LeadKind } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(kind: LeadKind, dto: CreateLeadDto, meta: LeadMeta) {
    this.assertHumanSubmission(dto);
    this.assertRequiredContact(kind, dto);
    const normalizedPhone = this.normalizePhone(dto.phone);

    const lead = await this.prisma.leadRequest.create({
      data: {
        kind,
        name: dto.name || null,
        phone: normalizedPhone,
        email: dto.email || null,
        message: dto.message || null,
        source: dto.source || null,
        pageUrl: dto.pageUrl || null,
        ip: meta.ip,
        userAgent: meta.userAgent,
      },
    });

    return {
      id: lead.id,
      kind: lead.kind,
      status: lead.status,
      message:
        kind === LeadKind.REVIEW
          ? 'Спасибо, отзыв отправлен и появится после проверки.'
          : 'Спасибо, заявка отправлена. Мы свяжемся с вами в течение 24 часов.',
    };
  }

  async findAll() {
    return this.prisma.leadRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true,
        kind: true,
        status: true,
        name: true,
        phone: true,
        email: true,
        message: true,
        source: true,
        pageUrl: true,
        ip: true,
        userAgent: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  private assertRequiredContact(kind: LeadKind, dto: CreateLeadDto) {
    if (kind === LeadKind.CALLBACK && !dto.phone) {
      throw new BadRequestException('Phone is required for callback requests');
    }

    if (!dto.phone && !dto.email) {
      throw new BadRequestException('Phone or email is required');
    }
  }

  private normalizePhone(phone?: string) {
    if (!phone) return null;

    const digits = phone.replace(/\D/g, '');

    if (digits.length < 10) {
      throw new BadRequestException('Phone must contain at least 10 digits');
    }

    return phone.trim();
  }

  private assertHumanSubmission(dto: CreateLeadDto) {
    if (dto.company) {
      throw new BadRequestException('Invalid form submission');
    }

    if (!dto.startedAt) {
      return;
    }

    const startedAt = new Date(dto.startedAt).getTime();

    if (Number.isNaN(startedAt)) {
      return;
    }

    if (Date.now() - startedAt < 2500) {
      throw new BadRequestException('Form was submitted too quickly');
    }
  }
}

export type LeadMeta = {
  ip?: string;
  userAgent?: string;
};
