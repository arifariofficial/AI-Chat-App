import LocalLibrary from "@mui/icons-material/LocalLibrary";

export function EmptyScreen() {
  return (
    <div className="mx-auto -mt-64 flex h-full flex-col items-center justify-center gap-2  px-4">
      <LocalLibrary
        fontSize="large"
        className="m-1 rounded-full border border-foreground/70 p-1  text-foreground/70 shadow-sm"
      />
      <div className="flex max-w-sm flex-col items-center gap-2 rounded-lg  bg-inherit text-center">
        <h1 className="text-lg font-semibold text-foreground/80 ">
          Welcome to SIPE AI Service
        </h1>
        <p className="leading-normal text-muted-foreground">
          Counseling for the average person and high focus on the
          individual&apos;s rights in insurance cases
        </p>
      </div>
    </div>
  );
}
