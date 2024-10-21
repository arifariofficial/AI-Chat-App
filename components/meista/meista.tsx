import styles from "/styles/home.module.css";
const Meista = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meistä</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visiomme ja missiomme</h2>

        <div className={styles.missionVision}>
          <h3 className={styles.boldBlue}>Visio</h3>
          <p>
            Kuvitelkaa maailma, jossa jokainen pystyy helposti löytämään tietoa
            ja puolustamaan oikeuksiaan tasavertaisemmin.
          </p>
          <br /> {/* Empty paragraph for spacing */}
          <h3 className={styles.boldBlue}>Missio</h3>
          <p>
            Tuoda tekoälyn avulla oikeudellinen tieto ja tuki kaikkien
            saataville, jotta monimutkaiset järjestelmät tai prosessit eivät
            estä ketään saamasta oikeuttaan.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Meista;
