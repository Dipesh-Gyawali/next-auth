"use client";
import { usePathname } from "next/navigation";

export const NotificationDetail = () => {
  const pathname = usePathname();
  //   console.log({ pathname }, "xxxxxxxx");

  const urlFromRoute = pathname;

  const urlArray = urlFromRoute.split("/");
  console.log(urlArray, "uuuuu");

  // Decode each slug segment
  const decodedSlug = urlArray.map((part) => decodeURIComponent(part));

  // Extract and format the Published Date
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
