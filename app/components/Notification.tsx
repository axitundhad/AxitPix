"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotification({ message, type, id });
    setTimeout(() => {
      setNotification((current) => (current?.id === id ? null : current));
    }, 3000);
  };

return (
  <NotificationContext.Provider value={{ showNotification }}>
    {children}
    {notification && (
      <div className="fixed bottom-6 right-6 z-[100]">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${
            getAlertColor(notification.type)
          }`}
        >
          <span className="font-medium">{notification.message}</span>
        </div>
      </div>
    )}
  </NotificationContext.Provider>
);
}

function getAlertColor(type: NotificationType): string {
  switch (type) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500 text-black";
    case "info":
      return "bg-blue-800";
    default:
      return "bg-gray-500";
  }
}


export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}