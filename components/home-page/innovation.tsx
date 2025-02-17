import Image from "next/image";
import InsurancePaper from "@/public/assets/insurance-paper.jpg";
import HandShake from "@/public/assets/hand-shaking.jpg";
import AIJustice from "@/public/assets/ai-law.jpg";

const InnovationSection = () => {
  return (
    <section className="relative bg-background py-16">
      <div className="mx-auto flex flex-col items-center gap-8 md:flex-row">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold uppercase text-muted-foreground">
            Älykäs innovaatio
          </h2>
          <h1 className="mt-4 text-4xl font-bold text-foreground">
            Innovoimme tulevaisuutta älykkäillä ratkaisuilla
          </h1>
          <p className="mt-4 text-muted-foreground">
            Kuvittele maailma, jossa jokainen voi helposti saada tietoa ja
            puolustaa oikeuksiaan tasavertaisemmin.
          </p>
        </div>

        {/* Right Content (Images) */}
        <div className="grid grid-cols-2 gap-4 md:w-1/2">
          <div className="col-span-2 overflow-hidden rounded-lg">
            <Image
              src={InsurancePaper}
              alt="Insurance Paper"
              className="scale-[1.8] object-cover"
              width={600}
              priority
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={HandShake}
              alt="Hand Shaking"
              className="scale-[1.8] object-cover object-center"
              width={400}
              priority
            />
          </div>
          <div>
            <Image
              src={AIJustice}
              alt="AI Justice"
              className="rounded-lg object-cover"
              width={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
