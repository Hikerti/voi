import SiteForm from "@/components/forms/SiteForm";

export default function HomeFinalCta() {
  return (
    <section className="vs-final-cta">
      <div>
        <p className="vs-kicker">старт</p>
        <h2>Расскажите, какой сайт нужен. Дальше соберём структуру и первый прототип.</h2>
        <p className="vs-final-cta__note">
          Короткая форма нужна для первого контакта: оставьте телефон, и мы уточним задачу,
          сроки и подходящий формат работы без длинного брифа.
        </p>
      </div>
      <SiteForm source="home-final-cta" compact />
    </section>
  );
}
