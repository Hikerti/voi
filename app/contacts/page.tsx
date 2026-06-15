import type { Metadata } from "next";
import ContactsContent from "@/components/contacts/ContactsContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты веб-студии",
  description: "Телефон, email, график работы и форма связи с Voitov Studio.",
  path: "/contacts",
  keywords: ["контакты веб-студии", "заказать сайт Москва"],
});

export default function ContactsPage() {
  return <ContactsContent />;
}
