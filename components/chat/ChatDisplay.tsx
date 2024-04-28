import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Message {
  author: string;
  text: string;
}

const ChatDisplay: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col-reverse space-y-10  space-y-reverse overflow-y-auto  pb-6 sm:px-6 ">
      <div ref={messagesEndRef} /> {/* Due to reverse-col, needs to be here */}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.author === "SIPE" ? "justify-end" : "justify-start"} items-start`}
        >
          <div className="flex items-start">
            <div className="flex flex-col">
              {message.author !== "SIPE" &&
                (session?.user?.image ? (
                  <Image
                    src={session?.user?.image || "/profile-placeholder.png"}
                    alt="profile"
                    width={23}
                    height={23}
                    className="rounded-full"
                  />
                ) : (
                  <AccountCircleIcon
                    fontSize="medium"
                    className="rounded-full bg-[#4F6E70] p-px text-[#F5EFD1] "
                  />
                ))}
            </div>

            <div className=" flex w-full flex-col">
              <p
                className={`mx-2 w-[40px] text-lg font-bold text-gray-700 ${message.author === "SIPE" ? "self-end" : "-mt-1 self-start "}`}
              >
                {message.author === "SIPE" ? "Sipe" : "You"}
              </p>

              <div
                className={`relative max-w-sm rounded-md bg-white p-4 text-justify text-base drop-shadow sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl ${message.author === "SIPE" ? "mr-2 " : "ml-3 "}`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          </div>
          <div>
            {message.author === "SIPE" && (
              <LocalLibraryIcon
                fontSize="medium"
                className="m-auto rounded-full bg-[#4F6E70] p-[3px] text-[#F5EFD1]"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
