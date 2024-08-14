import UserManagementPage from "@/pages/admin/user-management";
import NotiManagementPage from "@/pages/admin/notification/notification-management";
import NotificationCreator from "@/pages/admin/notification/notification-creator";

export const adminRoutes = [
  { path: "user-management", element: UserManagementPage },
  { path: "notification/manage", element: NotiManagementPage },
  { path: "notification/create", element: NotificationCreator },
];
