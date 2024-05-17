import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormattedText from "./formatSipeText";
import { CopyIcon, TickIcon } from "@components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

interface Message {
  author: string;
  text: string;
}

const ChatDisplay: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //Copy sipe text to clipboard
  const handleCopyText = useCallback((text: string) => {
    const copyText = text.replace(/\*\*(.*?)\*\*/g, "$1");
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }, []);

  return (
    <div className="flex h-full flex-col-reverse space-y-8 space-y-reverse  overflow-y-auto sm:px-6 ">
      <div ref={messagesEndRef} /> {/* Due to reverse-col, needs to be here */}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.author === "SIPE" ? "justify-start" : "justify-start"} items-start`}
        >
          <div className="flex items-start">
            <div className="flex flex-col">
              {message.author !== "SIPE" &&
                (session?.user?.image ? (
                  <Image
                    src={session?.user?.image || "/profile-placeholder.png"}
                    alt="profile"
                    width={25}
                    height={25}
                    className="rounded-full dark:bg-white"
                  />
                ) : (
                  <AccountCircleIcon
                    fontSize="medium"
                    className="rounded-full bg-[#4F6E70] p-px text-[#F5EFD1] dark:bg-white dark:text-[#0e172a]"
                  />
                ))}
            </div>

            <div>
              {message.author === "SIPE" && (
                <LocalLibraryIcon
                  fontSize="medium"
                  className="m-auto rounded-full bg-[#4F6E70] p-[3px] text-[#F5EFD1] dark:bg-white dark:text-[#0e172a]"
                />
              )}
            </div>
            <div className=" flex w-full flex-col">
              <p
                className={`mx-2 w-[40px] text-lg font-bold text-slate-800 dark:text-white/80 ${message.author === "SIPE" ? "self-start" : "self-start "}`}
              >
                {message.author === "SIPE" ? "Sipe" : "Sinä"}
              </p>

              <div
                className={`relative rounded-md p-3 pt-1 text-left font-serif text-sm leading-relaxed   md:text-base  ${message.author === "SIPE" ? "-ml-1 " : "-ml-1 "}`}
              >
                {message.author === "SIPE" ? (
                  <>
                    <FormattedText text={message.text} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleCopyText(message.text)}
                            className="ml-1 mt-1"
                          >
                            {!copySuccess ? (
                              <CopyIcon className="text-gray-400 hover:text-gray-900" />
                            ) : (
                              <TickIcon className="text-gray-400" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Copy</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
