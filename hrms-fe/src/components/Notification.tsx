import useNotification from "../hooks/useNotification";

export default function Notification() {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-2 right-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gray-200 p-4 rounded shadow min-w-75 text-end"
        >
          {notification.title}
        </div>
      ))}
    </div>
  );
}
