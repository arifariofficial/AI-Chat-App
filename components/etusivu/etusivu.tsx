import Link from "next/link";
import styles from "styles/home.module.css";

export default function Etusivu() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sipe AI</h1>
        <p className={styles.subtitle}>
          Innovating the Future with Intelligent Solutions
        </p>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Olemme vuonna 2024 perustettu yhtiö
        </h2>
        <p className={styles.sectionText}>
          Olemme vuonna 2024 perustettu yhtiö, joka pohjautuu tekoälyn avulla
          tehtävään tiedonhakuun. Meidän tavoitteena on auttaa ihmisiä löytämään
          tietoa ja hyödyntämään heidän oikeuksiaan tehokkaammin.
        </p>
        <p className={styles.sectionText}>
          Tarjoamme älykkäitä ratkaisuja, jotka tekevät oikeudellisen tiedon ja
          tuen saatavuudesta helpompaa, edullisempaa ja nopeampaa. Haluamme
          varmistaa, että jokainen voi navigoida monimutkaisissa järjestelmissä
          ja saada tarvitsemansa avun – tilanteessa kuin tilanteessa.
        </p>
      </section>
      <section className={styles.ctaSection}>
        <div className={styles.ctaText}>
          Haluatko kuulla lisää palveluistamme?
          <p>
            <Link href="/yhteystiedot" className={styles.link}>
              Ota yhteyttä
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
