import AnimatedLink from "@/components/ui/AnimatedLink";

interface NewsItem {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
}

interface NewsPreviewProps {
  items?: NewsItem[];
}

function formatDate(raw?: string) {
  if (!raw) return null;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsPreview({ items = [] }: NewsPreviewProps) {
  const visibleItems = items.slice(0, 3);

  return (
    <section className="news-preview" aria-labelledby="home-news-title">
      <div className="news-preview__inner">
        <div className="news-preview__head">
          <div>
            <p className="section-kicker">новости студии</p>
            <h2 className="news-preview__title" id="home-news-title">Новости</h2>
          </div>
          <AnimatedLink href="/news" className="news-preview__all">
            Все новости <span aria-hidden="true">→</span>
          </AnimatedLink>
        </div>

        {visibleItems.length > 0 ? (
          <div className="news-preview__grid">
            {visibleItems.map((item) => (
              <article className="news-card" key={item.slug}>
                <AnimatedLink href={`/news/${item.slug}`} className="news-card__link">
                  <div className="news-card__body">
                    {item.date && (
                      <span className="news-card__date">{formatDate(item.date)}</span>
                    )}
                    <h3 className="news-card__title">{item.title}</h3>
                    {item.excerpt && <p className="news-card__excerpt">{item.excerpt}</p>}
                    <span className="news-card__more">Читать новость →</span>
                  </div>
                </AnimatedLink>
              </article>
            ))}
          </div>
        ) : (
          <p className="news-preview__empty">Новости пока не опубликованы.</p>
        )}
      </div>
    </section>
  );
}
