"use client";
import { usePathname } from "next/navigation";

export const NotificationDetail = () => {
  const pathname = usePathname();
  //   console.log({ pathname }, "xxxxxxxx");

  const urlFromRoute = pathname;

  const urlArray = urlFromRoute.split("/");
  console.log(urlArray, "uuuuu");

  //the url gives %% in space so....
  const decodedSlug = urlArray.map((part) => decodeURIComponent(part));

  //making date readable : December 13, 2024 at 01:06:32 PM
  const publishedDateRaw = decodedSlug[6];
  const formattedPublishedDate = publishedDateRaw
    ? new Date(publishedDateRaw).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Invalid Date";

  return (
    <div>
      <div>
        <p>Event Name: {decodedSlug[3]}</p>
        <p>Event Description: {decodedSlug[4]}</p>
        <p>Event Date: {decodedSlug[5]}</p>
        <p>Published Date: {formattedPublishedDate}</p>
      </div>
    </div>
  );
};
