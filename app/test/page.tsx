import { Button } from "@/components/ui/button";

const Test = () => {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-red-600">
            Jokin meni pieleen!
          </h2>
          <p className="mb-6 text-gray-700">
            Valitettavasti jokin meni pieleen. Voit yrittää uudelleen.
          </p>
          <Button className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600">
            Yritä uudelleen
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Test;
