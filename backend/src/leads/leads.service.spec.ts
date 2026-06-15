import { LeadKind, LeadStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsService } from './leads.service';

type LeadCase = {
  kind: LeadKind;
  dto: CreateLeadDto;
};

describe('LeadsService', () => {
  const createLead = jest.fn();
  const findMany = jest.fn();
  const prisma = {
    leadRequest: {
      create: createLead,
      findMany,
    },
  } as unknown as PrismaService;

  const service = new LeadsService(prisma);
  const startedAt = new Date(Date.now() - 5_000).toISOString();
  const cases: LeadCase[] = [
    {
      kind: LeadKind.CONTACT,
      dto: { phone: '+10000000000', consent: true, startedAt },
    },
    {
      kind: LeadKind.CALLBACK,
      dto: {
        name: 'Tester',
        phone: '+10000000000',
        consent: true,
        startedAt,
      },
    },
    {
      kind: LeadKind.REVIEW,
      dto: {
        name: 'Tester',
        email: 'test@example.invalid',
        message: 'Review message',
        consent: true,
        startedAt,
      },
    },
    {
      kind: LeadKind.QUESTION,
      dto: {
        name: 'Tester',
        email: 'test@example.invalid',
        message: 'Question message',
        consent: true,
        startedAt,
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(cases)('stores $kind form submissions', async ({ kind, dto }) => {
    createLead.mockResolvedValue({
      id: 42,
      kind,
      status: LeadStatus.NEW,
    });

    const result = await service.create(kind, dto, {
      ip: '127.0.0.1',
      userAgent: 'jest',
    });

    expect(createLead).toHaveBeenCalledWith({
      data: expect.objectContaining({
        kind,
        name: dto.name || null,
        phone: dto.phone || null,
        email: dto.email || null,
        message: dto.message || null,
        ip: '127.0.0.1',
        userAgent: 'jest',
      }),
    });
    expect(result).toEqual(expect.objectContaining({ id: 42, kind }));
  });

  it('rejects the honeypot field', async () => {
    await expect(
      service.create(
        LeadKind.CONTACT,
        {
          phone: '+10000000000',
          company: 'spam',
          consent: true,
          startedAt,
        },
        {},
      ),
    ).rejects.toThrow('Invalid form submission');

    expect(createLead).not.toHaveBeenCalled();
  });
});
