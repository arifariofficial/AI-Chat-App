import LocalLibrary from "@mui/icons-material/LocalLibrary";

export function EmptyScreen() {
  return (
    <div className="mx-auto -mt-20 flex size-full flex-col items-center justify-center gap-2 px-4">
      <LocalLibrary
        fontSize="large"
        className="m-1 rounded-full border p-1 text-foreground shadow-md"
      />
      <div className="flex max-w-sm flex-col items-center gap-2 rounded-lg bg-inherit text-center">
        <h1 className="text-lg font-semibold text-foreground">
          Tervetuloa SipeAI Palveluun
        </h1>
        <p className="leading-normal text-foreground">
          Neuvontaa tavalliselle henkilölle ja korkea keskittyminen yksilön
          oikeuksiin vakuutustapauksissa
        </p>
      </div>
    </div>
  );
}
