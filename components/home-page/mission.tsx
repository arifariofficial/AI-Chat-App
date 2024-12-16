import Image from "next/image";
import SecureFamily from "@/public/assets/secure-family.jpg";

const MissionSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <Image
          src={SecureFamily}
          alt="SIPE’s Mission"
          className="scale-[1.7] object-cover opacity-30 shadow-sm"
          fill
          priority
          style={{
            objectPosition: "10% 10%",
          }}
        />
      </div>

      {/* Content */}
      <div className="mx-auto flex flex-col items-end justify-center">
        <div className="text-center sm:pr-6 md:w-1/2 md:text-right">
          <h2 className="pretitle">Oikeutta tekoälyn avulla</h2>
          <h1 className="subtitle mt-4">SIPE:n tehtävä</h1>
          <p className="mt-4 text-foreground">
            Teemme oikeudellisesta tiedosta ja tuesta helposti saatavaa kaikille
            tekoälyn avulla, jotta monimutkaiset järjestelmät tai prosessit
            eivät estäisi ketään saamasta oikeuksiaan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
