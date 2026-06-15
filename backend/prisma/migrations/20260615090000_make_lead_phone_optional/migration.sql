PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_LeadRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "message" TEXT,
    "source" TEXT,
    "pageUrl" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "new_LeadRequest" (
    "id", "kind", "status", "name", "phone", "email", "message",
    "source", "pageUrl", "ip", "userAgent", "createdAt", "updatedAt"
)
SELECT
    "id", "kind", "status", "name", "phone", "email", "message",
    "source", "pageUrl", "ip", "userAgent", "createdAt", "updatedAt"
FROM "LeadRequest";

DROP TABLE "LeadRequest";
ALTER TABLE "new_LeadRequest" RENAME TO "LeadRequest";

CREATE INDEX "LeadRequest_kind_status_createdAt_idx"
ON "LeadRequest"("kind", "status", "createdAt");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
