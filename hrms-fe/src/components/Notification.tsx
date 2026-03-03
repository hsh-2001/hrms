import useNotification from "../hooks/useNotification";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export default function Notification() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  const getNotificationStyle = (type?: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getIcon = (type?: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "success":
        return <CheckCircle2 className={iconClass} />;
      case "error":
        return <XCircle className={iconClass} />;
      case "warning":
        return <AlertCircle className={iconClass} />;
      case "info":
        return <Info className={iconClass} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getNotificationStyle(notification.type)}
            border rounded-lg shadow-lg p-4 min-w-80 max-w-96
            animate-slide-in-right flex items-start gap-3
          `}
        >
          <div className="flex-shrink-0 mt-0.5">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{notification.title}</p>
            {notification.message && (
              <p className="text-xs mt-1 opacity-90">{notification.message}</p>
            )}
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
