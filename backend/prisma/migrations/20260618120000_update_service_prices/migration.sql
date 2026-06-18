UPDATE "Service"
SET
    "pricePrefix" = 'от',
    "price" = '95 000 ₽',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'landing-page';

UPDATE "Service"
SET
    "pricePrefix" = 'от',
    "price" = '150 000 ₽',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" IN ('corporate-website', 'corporate-site');

UPDATE "Service"
SET
    "pricePrefix" = 'от',
    "price" = '65 000 ₽',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'website-redesign';

UPDATE "PricePackage"
SET
    "price" = 'от 95 000 ₽',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'landing-start';

UPDATE "PricePackage"
SET
    "price" = 'от 150 000 ₽',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'studio-website';

UPDATE "PricePackage"
SET
    "price" = 'от 65 000 ₽',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'visual-upgrade';
