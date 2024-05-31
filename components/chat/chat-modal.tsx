import ChatPageSkeleton from "@components/skeletons/ChatSkeleton";
import { Button } from "@components/ui/button";

interface ChatModalProps {
  showModal: boolean;
  handleModalClose: () => void;
}

export default function ChatModal({
  showModal,
  handleModalClose,
}: ChatModalProps) {
  return (
    <div className="relative inset-x-0 top-0 mx-auto  flex w-screen max-w-screen-lg bg-transparent sm:h-[calc(100vh-70px)]">
      <ChatPageSkeleton />
      {showModal && (
        <div className="absolute inset-x-0 flex h-[calc(100vh-70px)] w-full items-center justify-center font-semibold md:mt-auto ">
          <div className=" flex w-[250px] max-w-[400px] flex-col items-center justify-center rounded-xl border border-border/20 bg-background p-4 text-foreground shadow-2xl sm:h-[180px] sm:w-[350px]">
            <p className="p-4 text-foreground">Please Sign In </p>
            <Button
              variant="outline"
              className="mb-6 w-[150px]"
              onClick={handleModalClose}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
