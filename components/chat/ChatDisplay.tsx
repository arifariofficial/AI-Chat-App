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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative m-2 mb-px flex h-[85vh] flex-col justify-end space-y-2 overflow-auto rounded-b-md rounded-t-xl border  bg-gray-50 p-4 ">
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
                  className="m-auto rounded-full bg-[#2d4242] p-1 text-[#F5EFD1] "
                />
              ))}
          </div>

          <div>
            <p
              className={`max-w-md rounded-lg p-3 text-sm shadow ${message.author === "SIPE" ? "bg-blue-200 text-blue-900" : "bg-green-200 text-green-900"}`}
            >
              {message.text}
            </p>
          </div>
          {message.author === "SIPE" && (
            <LocalLibraryIcon
              fontSize="large"
              className="m-auto rounded-full bg-[#2d4242] p-1 text-[#F5EFD1]"
            />
          )}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatDisplay;
