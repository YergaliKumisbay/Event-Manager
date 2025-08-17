import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <section className={styles.hero} aria-labelledby="hero-title">
            <h1 id="hero-title" className={styles.title}>Event Manager</h1>
            <p className={styles.subtitle}>
              Минималистичный менеджер мероприятий для команд: создавайте, фильтруйте и управляйте событиями без лишнего визуального шума.
            </p>
            <div className={styles.actions}>
              <Link href="/events" className={`${styles.btn} ${styles.btnPrimary}`}>
                Перейти к событиям
              </Link>
            </div>
          </section>

          <section className={styles.features} aria-label="Возможности">
            <article className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {/* календарь */}
                <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="17" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 4v4M16 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Создание и редактирование</h3>
              <p className={styles.featureText}>Добавляйте события с категорией, статусом и датой. Редактируйте и удаляйте с подтверждением.</p>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {/* фильтр/сортировка */}
                <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Фильтры и сортировка</h3>
              <p className={styles.featureText}>Фильтруйте по категории и статусу, сортируйте по дате и названию, ищите по тексту.</p>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon} aria-hidden="true">
                {/* избранное */}
                <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none">
                  <path d="M12 17.27l5.18 3.13-1.64-5.81L20 10.5l-5.9-.51L12 4.5 9.9 10l-5.9.5 4.46 4.09-1.64 5.81L12 17.27z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Избранные события</h3>
              <p className={styles.featureText}>Помечайте важные события и открывайте их быстрее на отдельной вкладке.</p>
            </article>
          </section>
        </main>
      </div>
  );
}
