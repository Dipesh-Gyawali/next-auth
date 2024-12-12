"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { socket } from "@/lib/socketClient";
import { ProtectedRouteForAdmin } from "@/ProtectedRoute";
import { UserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { RoleGate } from "./auth/role-gate";

export const Header = ({ userRole }: { userRole: any }) => {
  console.log(userRole, "mmmmmmmmmmmmmmmmmmmmmm");
  const [notification, setNotification] = useState([
    { id: "1", notificationMsg: "This is tihar event" },
    { id: "2", notificationMsg: "This is dashain event" },
    { id: "3", notificationMsg: "This is holi event" },
  ]);
  const [count, setCount] = useState(notification.length);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    //3
    // Listen for new notifications from the server
    socket.on("send_notification", (newNotification) => {
      setNotification((prev) => [...prev, newNotification]);
      setCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.off("send_notification"); // Cleanup listener on unmount
    };
  }, []);

  const handleAddEvent = () => {
    if (!inputMessage.trim()) return;
    const newNotification = {
      id: Date.now().toString(),
      notificationMsg: inputMessage,
    };

    // Emit only the new notification
    //1 now see server.mts (total: 3 steps)
    socket.emit("send_notification", newNotification);

    setInputMessage(""); // Clear input after sending
  };

  return (
    <nav className="bg-blue-200 p-3 flex flex-row items-center justify-end gap-5">
      <div className="flex flex-row items-center justify-center">
        {/* Input for admin */}
        {userRole === "ADMIN" ? (
          <>
            <div className="flex flex-row gap-4 mt-5">
              <input
                type="text"
                className="border border-black-500 rounded-md"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                className="border-none bg-slate-400 p-2 rounded-lg"
                onClick={handleAddEvent}
              >
                Add Event
              </button>
            </div>
          </>
        ) : null}

        <div className="m-3 pt-3">
          <Popover>
            <PopoverTrigger>
              <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                {/* Notification Icon */}
                <div className="absolute top-1.5 right-1.5 bg-blue-500 text-white p-1 rounded-full shadow hover:bg-blue-600 transition-colors duration-200">
                  <FaCommentDots className="w-4 h-4" />
                </div>

                {/* Bell Icon */}
                <FaRegBell className="w-6 h-6 text-blue-500" />

                {/* Count Badge */}
                {count > 0 && (
                  <div className="absolute bottom-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                    {count}
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {notification.map((item, index) => (
                <ul key={item.id}>
                  <li>{item.notificationMsg}</li>
                  <hr />
                </ul>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

{
  /* <div className="relative flex flex-row border border-red-500">
                <div className="absolute top-0 right-0">
                  <FaCommentDots />
                </div>
                <FaRegBell className="h-14" />
                <div className="absolute bottom-0 right-0 ml-4">{count}</div>
              </div> */
}
