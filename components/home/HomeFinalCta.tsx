import SiteForm from "@/components/forms/SiteForm";

export default function HomeFinalCta() {
  return (
    <section className="vs-final-cta">
      <div>
        <p className="vs-kicker">старт</p>
        <h2>Расскажите, какой сайт нужен. Дальше соберем структуру и первый прототип.</h2>
      </div>
      <SiteForm source="home-final-cta" compact />
    </section>
  );
}
