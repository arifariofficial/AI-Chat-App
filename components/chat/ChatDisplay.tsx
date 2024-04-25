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
    <div className="flex h-full  flex-col-reverse space-y-3  space-y-reverse overflow-y-auto rounded-b-md rounded-t-xl px-6 pb-6 ">
      <div ref={messagesEndRef} />
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.author === "SIPE" ? "justify-end" : "justify-start"} items-end space-x-2`}
        >
          <div className="flex flex-col">
            {message.author !== "SIPE" &&
              (session?.user?.image ? (
                <Image
                  src={session?.user?.image || "/profile-placeholder.png"}
                  alt="profile"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              ) : (
                <AccountCircleIcon
                  fontSize="large"
                  className="m-auto rounded-full bg-[#4F6E70] p-1 text-[#F5EFD1] "
                />
              ))}
          </div>

          <div>
            <p
              className={`max-w-md rounded-lg p-3 text-sm  shadow ${message.author === "SIPE" ? "bg-white text-slate-900" : "bg-[#fffef9] text-[#2e4342]"}`}
            >
              {message.text}
            </p>
          </div>
          {message.author === "SIPE" && (
            <LocalLibraryIcon
              fontSize="large"
              className="m-auto rounded-full bg-[#4F6E70] p-1 text-[#F5EFD1]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
