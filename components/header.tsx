"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { FaRegBell } from "react-icons/fa";

export const Header = () => {
  const [count, setCount] = useState(5);
  const [notification, setNotification] = useState([
    { id: "1", notificationMsg: "This is tihar event" },
    { id: "2", notificationMsg: "This is dashain event" },
    { id: "3", notificationMsg: "This is holi event" },
  ]);

  return (
    <nav className="bg-blue-200 p-3">
      <div className="flex flex-row items-center justify-end">
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
    </nav>
  );
};
