const Meista = () => {
  return (
    <div>
      <header>
        <h1>Meistä</h1>
      </header>
      <section>
        <h2>Visiomme ja missiomme</h2>

        <div>
          <h3>Visio</h3>
          <p>
            Kuvitelkaa maailma, jossa jokainen pystyy helposti löytämään tietoa
            ja puolustamaan oikeuksiaan tasavertaisemmin.
          </p>
          <br /> {/* Empty paragraph for spacing */}
          <h3>Missio</h3>
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
