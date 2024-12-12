"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useId, useState } from "react";
import { FaRegBell } from "react-icons/fa";

export const Header = () => {
  const twid = Date.now().toString();
  const [count, setCount] = useState(5);
  const [notification, setNotification] = useState([
    { id: "1", notificationMsg: "This is tihar event" },
    { id: "2", notificationMsg: "This is dashain event" },
    { id: "3", notificationMsg: "This is holi event" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleAddEvent = () => {
    if (!inputMessage.trim()) return;
    const data = {
      id: twid,
      notificationMsg: inputMessage,
    };
    console.log(data, "kkkkkkkkk");
    setNotification((prev) => [...prev, data]);
    setInputMessage("");
  };

  return (
    <nav className="bg-blue-200 p-3 flex flex-row items-center justify-end gap-5">
      <div className="flex flex-row items-center justify-center">
        {/* input from admin */}
        <div className="flex flex-row gap-4 mt-5">
          <input
            type="text"
            className="border border-black-500 rounded-md"
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
              {notification.map((item, index) => {
                return (
                  <ul key={index}>
                    <li>{item.notificationMsg}</li>
                    <hr></hr>
                  </ul>
                );
              })}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};
