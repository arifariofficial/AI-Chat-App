//yhteystiedot/page.tsx

import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";

export default function Yhteystiedot() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <Card className="w-full max-w-sm rounded-sm bg-background px-5 md:border md:border-border/30 md:px-7">
        <h1 className="mb-6 mt-4 text-2xl font-bold text-foreground">
          Yhteystiedot
        </h1>
        <p className="mb-6 text-sm text-foreground/80">
          Jos sinulla on kysyttävää tai palautetta, voit ottaa meihin yhteyttä
          seuraavasti:
        </p>

        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Sähköposti
          </h2>
          <p className="text-foreground/80">
            Voit lähettää sähköpostia osoitteeseen:{" "}
            <a
              href="mailto:info@example.com"
              className="text-link underline hover:text-primary"
            >
              info@example.com
            </a>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Puhelin
          </h2>
          <p className="text-foreground/80">
            Soita meille numeroon:{" "}
            <strong className="text-foreground">(012) 345-6789</strong>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Osoite
          </h2>
          <p className="text-foreground/80">
            Vieraile meillä: <br />
            Esimerkki Katu 1 <br />
            12345 Esimerkkikaupunki
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            Ota meihin yhteyttä
          </h2>
          <p className="mb-6 text-lg text-foreground/80">
            Voit myös käyttää alla olevaa lomaketta ottaaaksesi yhteyttä
            suoraan:
          </p>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground"
              >
                Nimi:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-input px-4 py-2 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Sähköposti:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-input px-4 py-2 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground"
              >
                Viesti:
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="mt-1 block w-full rounded-md border border-input px-4 py-2 shadow-sm focus:border-primary focus:ring-primary"
              ></textarea>
            </div>
            <Button
              variant="default"
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Lähetä
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
