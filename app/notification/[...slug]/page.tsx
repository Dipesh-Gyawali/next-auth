import { NotificationDetail } from "@/components/notification-detail";

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="bg-[#E6F1FF] h-[100vh] w-[100vw]">
      {/* <div>My Post: {slug}</div> */}
      <NotificationDetail />
    </div>
  );
}
