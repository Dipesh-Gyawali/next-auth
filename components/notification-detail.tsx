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

  return (
    <div>
      <div>
        <p>Event Name: {decodedSlug[3]}</p>
        <p>Event Description: {decodedSlug[4]}</p>
        <p>Event Date: {decodedSlug[5]}</p>
        <p>Published Date: {decodedSlug[6]}</p>
      </div>
    </div>
  );
};
