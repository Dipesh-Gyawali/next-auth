"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

export const Header = ({ userRole }: { userRole: any }) => {
  console.log(userRole, "mmmmmmmmmmmmmmmmmmmmmm");
  const [notification, setNotification] = useState([
    {
      id: "1",
      notificationMsg: "We will celebrate in Hyatt Hotel",
      eventName: "Tihar Event",
      eventDate: "12/13/2024",
    },
    {
      id: "2",
      notificationMsg: "We will celebrate in Yak and Yeti",
      eventName: "WEN Event",
      eventDate: "12/14/2024",
    },
    {
      id: "3",
      notificationMsg: "We will celebrate in Hotel Annapurna",
      eventName: "Holi Event",
      eventDate: "12/15/2024",
    },
  ]);

  const [count, setCount] = useState(notification.length);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    //sending notification to all users except admin
    //1 see server.mts (total: 5 steps)
    // Register user role on connection
    socket.emit("register_role", { role: userRole });

    //4
    socket.on("send_notification", (newNotification) => {
      setNotification((prev) => [...prev, newNotification]);
      setCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.off("send_notification");
    };
  }, [userRole]);

  const handleAddEvent = () => {
    if (!inputMessage.trim()) return;
    const newNotification = {
      id: Date.now().toString(),
      notificationMsg: inputMessage,
    };

    //3
    socket.emit("send_notification", newNotification);

    setInputMessage(""); // Clear input after sending
  };

  return (
    <nav className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 p-4 flex flex-row items-center justify-between shadow-lg rounded-lg">
      <div className="flex flex-row items-center gap-6">
        {/* Input for admin */}
        {userRole === "ADMIN" && (
          <div className="flex flex-row gap-4 items-center max-sm:flex-wrap">
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter event message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <Popover>
          <PopoverTrigger>
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-gray-300 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              {/* Notification Icon */}
              <div className="absolute top-1.5 right-1.5 bg-blue-500 text-white p-1 rounded-full shadow hover:bg-blue-600 transition-colors duration-200">
                <FaCommentDots className="w-4 h-4" />
              </div>

              {/* Bell Icon */}
              <FaRegBell className="w-6 h-6 text-blue-500" />

              {/* Count Badge */}
              {count > 0 && (
                <div className="absolute bottom-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                  {count}
                </div>
              )}
            </div>
          </PopoverTrigger>

          <PopoverContent className="bg-white p-4 shadow-lg rounded-lg w-72 border border-gray-200">
            {notification.length > 0 ? (
              notification.map((item, index) => (
                <ul key={item.id} className="mb-2">
                  <li className="text-sm text-gray-700">
                    Event name:{item.eventName}{" "}
                  </li>
                  <li className="text-sm text-gray-700">
                    Event date:{item.eventDate}{" "}
                  </li>
                  <li
                    className="text-sm text-gray-700"
                    aria-describedby="event desc"
                  >
                    Event desc: {item.notificationMsg}
                  </li>
                  <li className="text-sm text-gray-700">
                    Published date: {Date.now()}
                  </li>
                  {index < notification.length - 1 && (
                    <hr className="my-2 border-gray-300" />
                  )}
                </ul>
              ))
            ) : (
              <p className="text-sm text-gray-500">No new notifications</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};
