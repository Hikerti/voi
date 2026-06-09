"use client";

import SiteForm from "@/components/forms/SiteForm";

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  return (
    <div className="forma-menu">
      <div className="form-block-24 w-form">
        <SiteForm source="menu" title="Обсудить проект" />
        <button type="button" className="close-c-btn1-m w-button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
