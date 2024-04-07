import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


interface Message {
  author: string;
  text: string;
}


const ChatDisplay: React.FC<{ messages: Message[]; }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
      <div className="flex min-h-[450px] max-h-[800px] flex-col overflow-auto rounded-t-lg bg-gray-100 p-6 space-y-2 relative"  >
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.author === "SIPE" ? "justify-end" : "justify-start"} items-end space-x-2`}>
          <div className="flex flex-col">{message.author !== "SIPE" && (
          session?.user?.image ? (
            <Image
              src={session?.user?.image || "/profile-placeholder.png"}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
            /> ): (
              <AccountCircleIcon fontSize="large"  className="bg-[#2d4242] text-[#F5EFD1] rounded-full m-auto p-1 "/>
            )
            
          )}
          </div>
          
          <div>
            <p className={`max-w-xs rounded-lg p-3 text-sm shadow ${message.author === "SIPE" ? "bg-blue-200 text-blue-900" : "bg-green-200 text-green-900"}`}>
              {message.text}
            </p>
          </div>
          {message.author === "SIPE" && (
            // Placeholder for AI's Profile Picture
            <LocalLibraryIcon fontSize="large" className="text-[#F5EFD1] bg-[#2d4242] rounded-full m-auto p-1"/>
          )}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatDisplay;
