import type { Metadata } from "next";
import ContactsContent from "@/components/contacts/ContactsContent";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты веб-студии",
  description: `Контакты ${SITE.name}: телефон, email, график работы и форма связи.`,
  path: "/contacts",
  keywords: ["контакты веб-студии", "заказать сайт Москва"],
});

export default function ContactsPage() {
  return <ContactsContent />;
}
