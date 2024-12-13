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
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg bg-blue-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Notification Details
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Event Name:</p>
          <p className="text-sm text-gray-600">{decodedSlug[3]}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">
            Event Description:
          </p>
          <p className="text-sm text-gray-600">{decodedSlug[4]}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Event Date:</p>
          <p className="text-sm text-gray-600">{decodedSlug[5]}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-semibold text-gray-700">Published Date:</p>
          <p className="text-sm text-gray-600">{formattedPublishedDate}</p>
        </div>
      </div>
    </div>
  );
};
