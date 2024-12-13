"use client";

import { socket } from "@/lib/socketClient";
import { useEffect } from "react";

export const NotificationDetail = () => {
  useEffect(() => {
    socket.on("send_notification", (newNotification) => {
      console.log(newNotification, "jjjjjjjjjjj notification detail");
    });
    console.log("notification detail");
  }, []);
  return (
    <div>
      <div>
        <p>Event Name: </p>
        <p>Event Description:</p>
        <p>Event Date:</p>
        <p>Published Date:</p>
      </div>
    </div>
  );
};
