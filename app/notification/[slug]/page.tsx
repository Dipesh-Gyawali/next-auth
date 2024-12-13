import { NotificationDetail } from "@/components/notification-detail";

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div>
      <h1>Detail Notification</h1>
      <div>My Post: {slug}</div>
      <NotificationDetail />
    </div>
  );
}
