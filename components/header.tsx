"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";

export const Header = () => {
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
        <div className="m-3 pt-3">
          <Popover>
            <PopoverTrigger>
              <div className="flex flex-row">
                <FaRegBell />
                {count}
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
