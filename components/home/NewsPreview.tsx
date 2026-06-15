import AnimatedLink, { ShuffleText } from "@/components/ui/AnimatedLink";

interface NewsItem {
  slug: string;
  title: string;
  date?: string;
  image?: string;
}

interface NewsPreviewProps {
  items?: NewsItem[];
}

function formatDate(raw?: string) {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsPreview({ items = [] }: NewsPreviewProps) {
  return (
    <section className="news-preview">
      <div className="news-preview__inner">
        <div className="news-preview__head">
          <h2 className="news-preview__title">Наши&nbsp;Статьи</h2>
        </div>

        {items.length > 0 ? (
          <div className="news-preview__grid">
            {items.map((item) => (
              <AnimatedLink
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="news-card"
              >
                <div
                  className="news-card__image"
                  style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
                />
                <div className="news-card__body">
                  {item.date && (
                    <span className="news-card__date">{formatDate(item.date)}</span>
                  )}
                  <h3 className="news-card__title">{item.title}</h3>
                </div>
              </AnimatedLink>
            ))}
          </div>
        ) : (
          <p className="news-preview__empty">Статьи не найдены.</p>
        )}
      </div>
    </section>
  );
}
