import Image from "next/image";
import CarAccident from "@/public/assets/car-acccident.jpg";

const HeroSection = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto flex max-w-screen-2xl flex-col items-center gap-8 md:flex-row">
        <div className="text-center md:w-1/2 md:text-left">
          <h2 className="text-2xl font-bold uppercase text-muted-foreground">
            Luotettava tuki
          </h2>
          <h1 className="mt-4 text-4xl font-bold text-foreground">
            Luotettava kumppanisi vakuutuskorvauksissa
          </h1>
        </div>
        <div className="flex min-w-[400px] flex-grow items-center justify-center sm:w-full">
          <Image
            src={CarAccident}
            alt="Car accident"
            layout="responsive" // Makes the image scale responsively
            width={100} // Percentage-based width
            height={75} // Maintain aspect ratio
            className="rounded-lg object-cover opacity-70 shadow-lg" // Ensures it covers the entire space
            priority // Load this image as a priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
