import { SITE } from "@/lib/constants";

type SocialKey =
  | "telegram"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "max"
  | "vk"
  | "odnoklassniki";

type SocialItem = {
  key: SocialKey;
  label: string;
  href: string | null;
  description?: string;
};

const SOCIALS: Record<SocialKey, SocialItem> = {
  telegram: { key: "telegram", label: "Telegram", href: SITE.telegram },
  whatsapp: { key: "whatsapp", label: "WhatsApp", href: SITE.whatsapp },
  instagram: { key: "instagram", label: "Instagram", href: SITE.instagram },
  facebook: { key: "facebook", label: "Facebook", href: SITE.facebook },
  max: { key: "max", label: "MAX", href: SITE.max, description: SITE.maxPhone },
  vk: { key: "vk", label: "ВКонтакте", href: SITE.vk },
  odnoklassniki: {
    key: "odnoklassniki",
    label: "Одноклассники",
    href: SITE.odnoklassniki,
  },
};

const DEFAULT_NETWORKS: readonly SocialKey[] = [
  "telegram",
  "whatsapp",
  "instagram",
  "facebook",
  "max",
];

function SocialIcon({ name }: { name: SocialKey }) {
  if (name === "telegram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.4 3.4 18.2 19c-.2 1.1-.8 1.4-1.7.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.4-.1-.6-.6-.2L5.8 12.8 1 11.3c-1-.3-1-1 .2-1.5L20 2.6c.9-.3 1.7.2 1.4.8Z" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a9.7 9.7 0 0 0-8.3 14.8L2.4 22l5.3-1.4A9.8 9.8 0 1 0 12 2Zm0 17.8c-1.4 0-2.8-.4-4-1.1l-.3-.2-3.1.8.8-3-.2-.3A7.8 7.8 0 1 1 12 19.8Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.2.2-.4.2-.6.1a6.3 6.3 0 0 1-3.2-2.8c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.4.1-.6l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.2-.5-.3Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.8 22v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.6 1.6-1.6H17V4.5c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5V14h2.8v8h3.5Z" />
      </svg>
    );
  }

  if (name === "vk") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.2 6.4h3.1c.2 3.5 1.7 5 3 5.3V6.4h3v3c1.3-.1 2.7-1.4 3.1-3h3.1c-.4 1.9-1.9 3.3-3 3.9 1.1.4 2.7 1.7 3.3 3.8h-3.4c-.5-1.4-1.6-2.5-3.1-2.7v2.7h-.4c-5.2 0-8.2-3.5-8.7-7.7Z" />
      </svg>
    );
  }

  if (name === "odnoklassniki") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="6.5" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7.4 12.4c1.3 1 2.9 1.5 4.6 1.5s3.3-.5 4.6-1.5M9 20l3-3.2 3 3.2M12 13.9v2.9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18V6h3.2l4.8 6 4.8-6H20v12h-3.1v-7.3L12 16.5l-4.9-5.8V18H4Z" />
    </svg>
  );
}

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
  networks?: readonly SocialKey[];
  showUnavailable?: boolean;
}

export default function SocialLinks({
  className = "",
  showLabels = false,
  networks = DEFAULT_NETWORKS,
  showUnavailable = false,
}: SocialLinksProps) {
  const items = networks
    .map((key) => SOCIALS[key])
    .filter((item) => showUnavailable || Boolean(item.href));

  if (items.length === 0) return null;

  return (
    <div className={`social-links ${className}`.trim()} aria-label="Социальные сети и мессенджеры">
      {items.map((item) => {
        const label = item.description ? `${item.label}: ${item.description}` : item.label;
        const content = (
          <>
            <span className="social-link__icon"><SocialIcon name={item.key} /></span>
            {showLabels ? <span className="social-link__label">{item.label}</span> : <span className="sr-only">{item.label}</span>}
          </>
        );

        return item.href ? (
          <a
            key={item.key}
            className={`social-link social-link--${item.key}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            {content}
          </a>
        ) : (
          <span
            key={item.key}
            className={`social-link social-link--${item.key} is-disabled`}
            aria-disabled="true"
            title={`${item.label}: ссылка будет добавлена`}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}
